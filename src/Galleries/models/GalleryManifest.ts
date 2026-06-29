export interface GalleryEntry {
  slug: string;
  title: string;
  coverImage: string;
  description: string;
}

export interface GalleryManifest {
  title: string;
  galleries: GalleryEntry[];
}
