import React from 'react';

export const PhotoGrid = ({ photos, onPhotoClick }) => {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400">
        <p>No photos match your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {photos.map((photo) => {
        const imageUrl = photo.thumbnail 
          ? URL.createObjectURL(photo.thumbnail) 
          : photo.blob ? URL.createObjectURL(photo.blob) : '';

        return (
          <div 
            key={photo.id} 
            className="group relative aspect-square rounded-xl overflow-hidden bg-slate-800 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all shadow-md animate-slide-up"
            onClick={() => onPhotoClick(photo)}
          >
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={photo.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onLoad={() => URL.revokeObjectURL(imageUrl)}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-xs truncate font-medium">{photo.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
