import ParagraphData from '../../ParagraphData';

export interface GalleryActionSlot {
  /** Direct link (store page, file download, etc.) Takes priority over botEndpoint. */
  storeUrl?: string;
  fileUrl?: string;
  botEndpoint?: string;
}

export interface GalleryActions {
  purchase?: GalleryActionSlot;
  sample?: GalleryActionSlot;
  useCase?: GalleryActionSlot;
}

/** Button label text — configurable globally and overridable per gallery. */
export interface GalleryButtonLabels {
  purchaseDirect: string;
  purchaseBot: string;
  sampleDirect: string;
  sampleBot: string;
  useCaseDirect: string;
  useCaseBot: string;
}

export interface GalleryItem {
  fileName: string;
  /** Full image URL — overrides baseUrl + fileName. Use for external sources (DeviantArt, etc.) */
  imageUrl?: string;
  /** URL opened when the user clicks "View Original" in the lightbox. */
  lightboxUrl?: string;
  title: string;
  altText: string;
  landscape: boolean;
  description: ParagraphData[];
  /** Each item owns its own action links. Buttons only render for slots that have a url or botEndpoint. */
  actions?: GalleryActions;
}

export interface GalleryConfig {
  title: string;
  baseUrl: string;
  sliderButtonLocations: 'top' | 'bottom' | 'both';
  /** Override button label text for this gallery only. Falls back to site.config.json galleryButtonLabels. */
  labelOverrides?: Partial<GalleryButtonLabels>;
  items: GalleryItem[];
}
