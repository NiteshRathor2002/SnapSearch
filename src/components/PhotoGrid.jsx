import React from "react";

export const PhotoGrid = ({ photos, onPhotoClick }) => {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400">
        <p>No photos match your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-4">
      {photos.map((photo) => {
        const imageUrl = photo.thumbnail
          ? URL.createObjectURL(photo.thumbnail)
          : photo.blob
            ? URL.createObjectURL(photo.blob)
            : "";

        return (
          <div
            key={photo.id}
            className="group relative aspect-square rounded-2xl overflow-hidden p-[2px] bg-gray-900 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer animate-slide-up"
            onClick={() => onPhotoClick(photo)}
          >
            <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-slate-800">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={photo.name}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-500 ease-out"
                  onLoad={() => URL.revokeObjectURL(imageUrl)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                  No Image
                </div>
              )}
              {/* Vibrant Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs sm:text-sm truncate font-semibold drop-shadow-md">
                  {photo.name}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
