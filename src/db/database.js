import Dexie from 'dexie';

export class PhotoDatabase extends Dexie {
  constructor() {
    super('PhotoSearchDB');
    this.version(1).stores({
      photos: 'id, name, source, normalizedText, expiresAt'
    });
  }
}

export const db = new PhotoDatabase();
