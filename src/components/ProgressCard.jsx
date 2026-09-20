import React from "react";
import {
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  FolderOpen,
  FolderDown,
  FileText,
  FileImage,
  File,
} from "lucide-react";

export const ProgressCard = ({
  total,
  completed,
  currentFile,
  isScanning,
  onCancel,
}) => {
  if (!isScanning && total === 0) return null;

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = !isScanning && total > 0 && completed === total;

  return (
    <div
      className={`w-full p-5 sm:p-8 bg-slate-800 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-500 ${isScanning ? "border-indigo-500/50 shadow-indigo-900/20" : "border-emerald-500/50 shadow-emerald-900/20"}`}
    >
      {isScanning && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 rounded-[2rem] blur-xl opacity-20 animate-pulse"></div>
      )}

      <div className="relative z-10">
        {isScanning && (
          <div className="h-20 sm:h-32 w-full flex justify-center items-end pb-2 sm:pb-4 relative mb-4 sm:mb-6 scale-[0.6] sm:scale-100 origin-bottom">
            <div className="absolute top-4 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl animate-pulse"></div>

            <div className="relative z-10 translate-x-[-80px]">
              <FolderOpen className="w-16 h-16 text-indigo-500" />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[200px]">
              <FileImage className="absolute w-8 h-8 text-blue-500 animate-fly-1 drop-shadow-sm" />
              <FileText className="absolute w-8 h-8 text-indigo-500 animate-fly-2 drop-shadow-sm" />
              <File className="absolute w-8 h-8 text-pink-500 animate-fly-3 drop-shadow-sm" />
            </div>

            <div className="relative z-10 translate-x-[80px]">
              <FolderDown className="w-16 h-16 text-emerald-500" />
            </div>
          </div>
        )}

        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-y-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <h3 className="text-lg sm:text-xl font-bold text-slate-50 flex items-center gap-2 sm:gap-3">
              {isScanning ? (
                <>
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 animate-spin" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500">
                    Scanning...
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  <span className="text-emerald-400">Complete</span>
                </>
              )}
            </h3>
            {isScanning && onCancel && (
              <button
                onClick={onCancel}
                className="px-3 py-1 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 rounded-lg text-sm font-semibold transition-colors border border-rose-500/20"
              >
                Cancel
              </button>
            )}
          </div>
          <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
            <span
              className={`text-2xl font-black ${isScanning ? "text-slate-50" : "text-emerald-400"}`}
            >
              {percentage}%
            </span>
            <span className="text-xs font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700">
              {completed} / {total}
            </span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900 rounded-full h-4 mb-5 overflow-hidden shadow-inner border border-slate-700/50 relative">
          {/* Progress Fill */}
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out relative ${isScanning ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500" : "bg-gradient-to-r from-emerald-500 to-emerald-400"}`}
            style={{ width: `${percentage}%` }}
          >
            {/* Glossy overlay for progress bar */}
            {isScanning && (
              <div className="absolute top-0 left-0 right-0 bottom-1/2 bg-white/20 rounded-full"></div>
            )}
            {/* Animated dot at the end of progress */}
            {isScanning && percentage > 2 && (
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_3px_rgba(255,255,255,0.8)] animate-pulse"></div>
            )}
          </div>
        </div>

        {/* File being processed */}
        {isScanning && currentFile && (
          <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
            <ImageIcon className="w-5 h-5 text-slate-400 animate-pulse" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 font-medium mb-0.5 uppercase tracking-wider">
                Processing
              </p>
              <p className="text-sm text-slate-200 truncate font-medium">
                {currentFile}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
