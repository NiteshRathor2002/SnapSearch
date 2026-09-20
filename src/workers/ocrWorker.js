import { createWorker } from 'tesseract.js';
import { OCR_CONFIG } from '../config/ocrConfig';

let tesseractWorkerPromise = null;

const getWorker = () => {
  if (!tesseractWorkerPromise) {
    tesseractWorkerPromise = (async () => {
      const worker = await createWorker('eng');
      await worker.setParameters({
        tessedit_pageseg_mode: OCR_CONFIG.pageSegmentationMode,
      });
      return worker;
    })();
  }
  return tesseractWorkerPromise;
};

self.onmessage = async (e) => {
  const { fileId, imageBlob } = e.data;
  
  try {
    const worker = await getWorker();
    
    const result = await worker.recognize(imageBlob);
    
    self.postMessage({
      status: 'success',
      fileId,
      text: result.data.text
    });

  } catch (error) {
    self.postMessage({
      status: 'error',
      fileId,
      error: error.message || 'OCR failed'
    });
  }
};
