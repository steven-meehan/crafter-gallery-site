export interface SeoConfig {
  siteName: string;
  defaultDescription: string;
  defaultImageUrl: string;
  defaultImageAltText: string;
}

export interface FooterLink {
  name: string;
  url: string;
  title: string;
}

export interface FooterConfig {
  fontColor: string;
  copyright: FooterLink;
  designer: FooterLink & { display: boolean };
}

export interface ErrorPageConfig {
  heading: string;
  message: string;
}

export interface StaticPageEntry {
  slug: string;
  title: string;
  dataFile: string;
}

export type { GalleryButtonLabels } from '../Galleries/models/GalleryConfig';
import type { GalleryButtonLabels } from '../Galleries/models/GalleryConfig';

export interface SiteConfig {
  siteUrl: string;
  dataBaseUrl: string;
  cacheAgeMs: number;
  cacheVersion: string;
  seo: SeoConfig;
  footer: FooterConfig;
  errorPage: ErrorPageConfig;
  galleryButtonLabels: GalleryButtonLabels;
  homePage?: StaticPageEntry;
  pages: StaticPageEntry[];
  calculators?: StaticPageEntry[];
}
