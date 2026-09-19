import { useState, useEffect } from "react";
import { db } from "../db/database";

export const usePhotos = (isScanning) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadPhotos = async () => {
      const now = Date.now();
      await db.photos.where("expiresAt").below(now).delete();

      if (searchQuery.trim() === "") {
        const allPhotos = await db.photos.limit(200).toArray();
        setPhotos(allPhotos);
      } else {
        const query = searchQuery.toLowerCase();
        const results = await db.photos
          .filter((photo) => photo.normalizedText.includes(query))
          .toArray();
        setPhotos(results);
      }
    };
    
    loadPhotos();
  }, [searchQuery, isScanning]);

  return { searchQuery, setSearchQuery, photos, setPhotos };
};
