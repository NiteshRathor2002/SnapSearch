import React, { useRef } from 'react';
import { FolderPlus } from 'lucide-react';

export const FolderSelector = ({ onFilesSelected }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      onFilesSelected(filesArray);
    }
  };

  return (
    <div 
      className="w-full flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 p-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl border-2 border-dashed border-slate-700/70 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300 group cursor-pointer shadow-2xl"
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="p-5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl group-hover:scale-110 group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] transition-all duration-300">
        <FolderPlus className="w-10 h-10 text-blue-400 group-hover:text-blue-300" />
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-xl font-bold text-slate-100 mb-1.5 group-hover:text-white transition-colors">Add Photo Folder</h3>
        <p className="text-slate-400 text-sm max-w-sm">Select a folder from your device to scan for text. Processing happens securely in your browser.</p>
      </div>
      <button 
        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/50 hover:shadow-blue-500/50 hover:-translate-y-0.5"
      >
        Browse
      </button>
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden" 
        webkitdirectory="true" 
        multiple
      />
    </div>
  );
};
