export const resizeImage = (file, maxSize = 1024, enhanced = false) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      
      // Draw image
      ctx.drawImage(img, 0, 0, width, height);

      // Preprocessing
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Basic grayscale and contrast
      const contrastFactor = enhanced ? 120 : 30;
      const c = (259 * (contrastFactor + 255)) / (255 * (259 - contrastFactor));

      for (let i = 0; i < data.length; i += 4) {
        // Grayscale (luminosity method)
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        
        // Contrast enhancement
        let adjusted = c * (gray - 128) + 128;
        
        // Thresholding / binarization for enhanced mode
        if (enhanced) {
          adjusted = adjusted > 140 ? 255 : 0;
        }

        data[i] = data[i + 1] = data[i + 2] = adjusted;
      }
      
      ctx.putImageData(imageData, 0, 0);

      // Return processed image as blob
      canvas.toBlob((blob) => resolve(blob), file.type || "image/jpeg", 0.8);
    };
    img.onerror = reject;
    img.src = url;
  });
};
