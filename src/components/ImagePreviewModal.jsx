import React, { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

export const ImagePreviewModal = ({ photo, onClose }) => {
  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  const imageUrl = photo.thumbnail 
    ? URL.createObjectURL(photo.thumbnail) 
    : photo.blob ? URL.createObjectURL(photo.blob) : '';

  const handleDownloadImage = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = photo.name || 'downloaded-image';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="relative flex flex-col md:flex-row w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-xl transition-all hover:scale-110 shadow-lg"
          title="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="w-full h-[60vh] md:h-[90vh] bg-black/95 flex items-center justify-center p-6 relative group">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={photo.name} 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          )}
          {/* Download Button Overlay */}
          <button 
            onClick={handleDownloadImage}
            className="absolute bottom-6 right-6 p-3 bg-blue-600/80 hover:bg-blue-500 text-white rounded-xl backdrop-blur-xl transition-all shadow-lg shadow-black/50 hover:-translate-y-1 md:opacity-0 md:group-hover:opacity-100 flex items-center gap-2"
            title="Download Original Image"
          >
            <Download className="w-5 h-5" />
            <span className="font-semibold text-sm hidden sm:block">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
