import React, { useState } from "react";
import { FolderSelector } from "./components/FolderSelector";
import { SearchBar } from "./components/SearchBar";
import { PhotoGrid } from "./components/PhotoGrid";
import { ProgressCard } from "./components/ProgressCard";
import { ImagePreviewModal } from "./components/ImagePreviewModal";
import { Camera, Search as SearchIcon } from "lucide-react";

import { usePhotos } from "./hooks/usePhotos";
import { useScanner } from "./hooks/useScanner";

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const { isScanning, scanProgress, handleFilesSelected, cancelScan } = useScanner(
    (setPhotosAction) => setPhotos(setPhotosAction)
  );
  
  const { searchQuery, setSearchQuery, photos, setPhotos } = usePhotos(isScanning);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#09090b] to-black text-slate-100 font-sans p-6 sm:p-10 selection:bg-teal-500/30">
      <header className="max-w-4xl mx-auto mb-16 text-center pt-8">
        <div className="inline-flex items-center justify-center p-2 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-2xl mb-6 shadow-xl shadow-teal-500/20 ring-1 ring-white/10 overflow-hidden">
          <img src="/icon-192x192.jpg" alt="Website Icon" className="w-12 h-12 rounded-xl object-cover" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-blue-400 drop-shadow-sm">
          SnapSearch
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">
          Your private, local photo search engine. Find any text inside your
          images instantly.
        </p>
      </header>

      <main className="max-w-4xl mx-auto flex flex-col items-center space-y-10 w-full">
        <div className="w-full max-w-2xl">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-6 transition-all duration-500 max-w-4xl">
          <div className={`w-full max-w-md flex transition-all duration-500 ${isScanning ? 'md:mr-auto md:justify-end' : 'mx-auto justify-center'}`}>
            <div className="w-full">
              <FolderSelector onFilesSelected={(files) => handleFilesSelected(files, searchQuery)} />
            </div>
          </div>
          {isScanning && (
            <div className="w-full max-w-md flex transition-all duration-500 md:ml-auto md:justify-start animate-in fade-in slide-in-from-left-4">
              <div className="w-full">
                <ProgressCard
                  total={scanProgress.total}
                  completed={scanProgress.completed}
                  currentFile={scanProgress.currentFile}
                  isScanning={isScanning}
                  onCancel={cancelScan}
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-full pt-8 border-t border-slate-800/50">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-200">
            <SearchIcon className="w-6 h-6 mr-3 text-teal-400" />
            {searchQuery ? "Search Results" : "Recent Photos"}
          </h2>
          <PhotoGrid
            photos={photos}
            onPhotoClick={(p) => setSelectedPhoto(p)}
          />
        </div>
      </main>

      <ImagePreviewModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}

export default App;
