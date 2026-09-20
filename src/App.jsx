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

  const { isScanning, scanProgress, handleFilesSelected, cancelScan } =
    useScanner((setPhotosAction) => setPhotos(setPhotosAction));

  const { searchQuery, setSearchQuery, photos, setPhotos } =
    usePhotos(isScanning);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans p-6 sm:p-10 selection:bg-indigo-500/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[50vh] pointer-events-none opacity-50 z-0">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-blue-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-[10%] right-[20%] w-[35vw] h-[35vw] bg-indigo-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] bg-pink-500/15 rounded-full blur-[100px]"></div>
      </div>

      <header className="relative z-10 max-w-4xl mx-auto mb-16 text-center pt-8">
        <div className="inline-flex items-center justify-center p-2 bg-gradient-to-br from-blue-500 via-indigo-500 to-pink-500 rounded-2xl mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)] ring-1 ring-white/10 overflow-hidden">
          <img
            src="/icon-192x192.jpg"
            alt="Website Icon"
            className="w-12 h-12 rounded-xl object-cover"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 drop-shadow-sm">
          SnapSearch
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg max-w-xl mx-auto font-medium px-4 sm:px-0">
          Your private, local photo search engine. Find any text inside your
          images instantly.
        </p>
      </header>
      
      <main className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-10 w-full">
        <div className="w-full max-w-2xl">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-6 transition-all duration-500 max-w-4xl">
          <div
            className={`w-full max-w-md flex transition-all duration-500 ${isScanning ? "md:mr-auto md:justify-end" : "mx-auto justify-center"}`}
          >
            <div className="w-full">
              <FolderSelector
                onFilesSelected={(files) =>
                  handleFilesSelected(files, searchQuery)
                }
              />
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

        <div className="w-full pt-8 border-t border-slate-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-50">
            <SearchIcon className="w-6 h-6 mr-3 text-indigo-400" />
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
