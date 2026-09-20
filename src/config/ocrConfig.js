export const OCR_CONFIG = {
  pageSegmentationMode: "11",
  maxDimension: 1400,
  getWorkerCount: () => {
    const cores = navigator.hardwareConcurrency || 4;
    return Math.min(4, Math.max(2, cores - 2));
  }
};
