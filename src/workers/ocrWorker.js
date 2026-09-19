import { createWorker } from 'tesseract.js';

let tesseractWorkerPromise = null;

const getWorker = () => {
  if (!tesseractWorkerPromise) {
    tesseractWorkerPromise = createWorker('eng');
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
