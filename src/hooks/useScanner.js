import { useState, useRef, useEffect } from 'react';
import { db } from '../db/database';
import { resizeImage } from '../utils/imageUtils';
import OcrWorker from '../workers/ocrWorker?worker';
import { OCR_CONFIG } from '../config/ocrConfig';

export const useScanner = (setPhotos, searchQuery) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState({
    total: 0,
    completed: 0,
    currentFile: "",
  });

  const workersRef = useRef(null);
  const cancelScanRef = useRef(false);

  useEffect(() => {
    if (!workersRef.current) {
      const maxWorkers = OCR_CONFIG.getWorkerCount();
      workersRef.current = Array.from({ length: maxWorkers }, () => new OcrWorker());
    }
  }, []);

  const handleFilesSelected = async (files, currentSearchQuery = searchQuery) => {
    if (files.length === 0) return;

    cancelScanRef.current = false;
    setIsScanning(true);
    setScanProgress({ total: files.length, completed: 0, currentFile: "" });

    const workers = workersRef.current;
    let currentIndex = 0;

    const processNext = async (worker) => {
      while (currentIndex < files.length) {
        if (cancelScanRef.current) break;
        const file = files[currentIndex++];
        setScanProgress((prev) => ({ ...prev, currentFile: file.name }));

        const existingByName = await db.photos.where("name").equals(file.name).toArray();
        if (existingByName.length > 0) {
          if (existingByName.some((p) => p.size === file.size)) {
            setScanProgress((prev) => ({ ...prev, completed: prev.completed + 1 }));
            continue;
          }
          const idsToDelete = existingByName.map((p) => p.id);
          await db.photos.bulkDelete(idsToDelete);
          setPhotos((prev) => prev.filter((p) => !idsToDelete.includes(p.id)));
        }

        try {
          const runOcr = (blob) => new Promise((resolve, reject) => {
            worker.onmessage = (e) => {
              if (e.data.status === "success") {
                resolve(e.data.text);
              } else {
                reject(new Error(e.data.error));
              }
            };
            worker.postMessage({ fileId: file.name, imageBlob: blob });
          });

          // Stage 1: Basic preprocessing
          const optimizedBlob = await resizeImage(file, OCR_CONFIG.maxDimension, false);
          let text = await runOcr(optimizedBlob);

          // Evaluate quality heuristic
          const evaluateQuality = (t) => {
            if (!t) return false;
            const letters = t.replace(/[^a-zA-Z]/g, '');
            return letters.length >= 5;
          };

          // Stage 2: Enhanced preprocessing if quality is poor
          if (!evaluateQuality(text)) {
            const enhancedBlob = await resizeImage(file, OCR_CONFIG.maxDimension, true);
            const fallbackText = await runOcr(enhancedBlob);
            if (evaluateQuality(fallbackText) || fallbackText.length > text.length) {
               text = fallbackText;
            }
          }

          const normalizedText = text.replace(/\s+/g, ' ').trim().toLowerCase();

          const record = {
            id: file.name,
            name: file.name,
            source: "User Folder",
            ocrText: text,
            normalizedText: normalizedText,
            size: file.size,
            lastModified: file.lastModified,
            blob: file,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000,
          };

          await db.photos.put(record);

          if (currentSearchQuery.trim() === "") {
            setPhotos((prev) => {
              const filtered = prev.filter((p) => p.id !== record.id);
              return [record, ...filtered];
            });
          }
        } catch (err) {
          console.error("OCR failed for", file.name, err);
        }

        setScanProgress((prev) => ({ ...prev, completed: prev.completed + 1 }));
      }
    };

    await Promise.all(workers.map((w) => processNext(w)));
    setIsScanning(false);
  };

  const cancelScan = () => {
    cancelScanRef.current = true;
    setIsScanning(false);
  };

  return { isScanning, scanProgress, handleFilesSelected, cancelScan };
};
