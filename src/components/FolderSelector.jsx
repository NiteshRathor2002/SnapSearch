import React, { useRef } from "react";
import { FolderPlus, ImagePlus } from "lucide-react";

export const FolderSelector = ({ onFilesSelected }) => {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).filter((file) =>
        file.type.startsWith("image/"),
      );
      onFilesSelected(filesArray);
    }
  };

  return (
    <div className="w-full">
      {/* Mobile View: Two Parallel Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:hidden w-full">
        {/* Add Photos Button */}
        <button 
          onClick={() => imageInputRef.current?.click()}
          className="relative overflow-hidden group flex flex-col items-start justify-center p-4 bg-gradient-to-br from-blue-500 via-indigo-500 to-pink-500 rounded-2xl hover:-translate-y-[1px] transition-all duration-300 shadow-[0_4px_15px_rgba(99,102,241,0.15)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.25)] border border-white/10"
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <div className="p-1.5 sm:p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <ImagePlus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
            <span className="font-bold text-white text-xs sm:text-sm tracking-wide">Add Photos</span>
            <span className="text-[10px] sm:text-[11px] font-medium text-white/90">From gallery</span>
          </div>
        </button>

        {/* Select Folder Button */}
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="relative overflow-hidden group flex flex-col items-start justify-center p-4 bg-slate-800 border border-slate-700 rounded-2xl hover:border-indigo-500/50 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-[1px]"
        >
          <div className="absolute bottom-0 right-0 -mb-4 -mr-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all"></div>
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <div className="p-1.5 sm:p-2 bg-slate-900 text-indigo-400 rounded-xl group-hover:bg-slate-900/80 transition-colors">
                <FolderPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <span className="font-bold text-slate-50 text-xs sm:text-sm tracking-wide group-hover:text-white transition-colors">Select Folder</span>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 text-left">Scan a directory</span>
          </div>
        </button>
      </div>

      {/* Desktop View: Single Large Dashed Box */}
      <div
        className="hidden sm:flex w-full flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 p-8 bg-gray-900 rounded-3xl border-2 border-dashed border-slate-700 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="p-5 bg-slate-800 text-indigo-400 rounded-2xl group-hover:scale-110 group-hover:bg-slate-800/80 transition-all duration-300">
          <FolderPlus className="w-10 h-10" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-slate-50 mb-1.5 group-hover:text-white transition-colors">
            Add Photo Folder
          </h3>
          <p className="text-slate-400 text-sm max-w-sm">
            Select a folder from your device to scan for text. Processing happens
            securely in your browser.
          </p>
        </div>
        <button className="px-8 py-3 bg-gradient-to-br from-blue-500 via-indigo-500 to-pink-500 text-white font-semibold rounded-xl transition-all shadow-[0_4px_15px_rgba(99,102,241,0.15)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.25)] hover:-translate-y-[1px]">
          Browse
        </button>
      </div>

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        webkitdirectory="true"
        multiple
      />
      
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        multiple
      />
    </div>
  );
};
