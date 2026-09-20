import React, { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

export const ImagePreviewModal = ({ photo, onClose }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-900/85 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="relative flex flex-col md:flex-row w-full max-w-6xl max-h-[95vh] bg-slate-800 rounded-3xl sm:rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full h-full bg-gray-900 rounded-[1.25rem] sm:rounded-[30px] overflow-hidden relative group">
          <button 
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20 p-2 sm:p-2.5 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white rounded-full backdrop-blur-xl transition-all hover:scale-110 border border-slate-700/50 shadow-sm"
            title="Close Preview"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Image Section */}
          <div className="w-full h-[85vh] md:h-[90vh] flex items-center justify-center p-2 sm:p-6 relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-pink-500/10 pointer-events-none"></div>
            
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={photo.name} 
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg relative z-10"
              />
            )}
            {/* Download Button Overlay */}
            <button 
              onClick={handleDownloadImage}
              className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 p-3 sm:p-4 bg-gradient-to-br from-blue-500 via-indigo-500 to-pink-500 text-white rounded-xl sm:rounded-2xl backdrop-blur-xl transition-all shadow-[0_4px_15px_rgba(99,102,241,0.15)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.25)] hover:-translate-y-[1px] md:opacity-0 md:group-hover:opacity-100 flex items-center gap-2 z-20 border border-white/10"
              title="Download Original Image"
            >
              <Download className="w-5 h-5" />
              <span className="font-bold text-sm hidden sm:block tracking-wide">Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
