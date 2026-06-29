import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import useHttp from '../../UseHttp/useHttp';
import Carousel from '../../Carousel/Carousel';
import ImageData from '../../Images/ImageData';
import GalleryActions from '../GalleryActions/GalleryActions';
import Spinner from '../../Spinner/Spinner';
import { GalleryConfig, GalleryButtonLabels } from '../models/GalleryConfig';

import siteConfig from '../../ConfigFiles/site.config.json';
import { slugify } from '../../utils/slugify';

const DEFAULT_LABELS: GalleryButtonLabels = siteConfig.galleryButtonLabels;

const GalleryView: React.FC = () => {
  const { slug = '', imageSlug } = useParams<{ slug: string; imageSlug?: string }>();
  const navigate = useNavigate();

  // Capture imageSlug at the time the gallery loads — used only for the initial
  // scroll position. Excluded from deps so carousel navigation doesn't re-fetch.
  const initialImageSlug = useRef(imageSlug);

  const [images, setImages] = useState<ImageData[]>([]);
  const [config, setConfig] = useState<GalleryConfig | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { sendRequest, isLoading, error, httpStatus } = useHttp();

  useEffect(() => {
    initialImageSlug.current = imageSlug;
    setImages([]);
    setConfig(null);
    setCurrentIndex(0);

    sendRequest(
      { url: `${siteConfig.dataBaseUrl}gallery-${slug}.json`, cacheAge: siteConfig.cacheAgeMs, cacheVersion: siteConfig.cacheVersion },
      (data: GalleryConfig) => {
        const untitled = data.items
          .map((item, i) => (!item.title ? i + 1 : null))
          .filter((i): i is number => i !== null);
        if (untitled.length > 0) {
          throw new Error(
            `gallery-${slug}.json: item(s) at position ${untitled.join(', ')} are missing a required "title" field.`
          );
        }

        const loaded: ImageData[] = data.items.map(item => ({
          fileName: item.fileName,
          htmlTitle: item.title,
          htmlAltText: item.altText,
          landscape: item.landscape,
          description: item.description,
          imageUrl: item.imageUrl ?? `${data.baseUrl}${item.fileName}`,
          externalUrl: item.lightboxUrl ?? '',
        }));
        const startIndex = initialImageSlug.current
          ? Math.max(0, loaded.findIndex(img => slugify(img.htmlTitle ?? '') === initialImageSlug.current))
          : 0;
        setCurrentIndex(startIndex);
        setImages(loaded);
        setConfig(data);
      }
    );
  }, [sendRequest, slug]); // imageSlug intentionally omitted — handled via ref above

  const handleIndexChange = useCallback((i: number, title?: string) => {
    setCurrentIndex(i);
    const segment = title ? slugify(title) : String(i + 1);
    navigate(`/gallery/${slug}/${segment}`, { replace: true });
  }, [navigate, slug]);

  if (isLoading) return <Spinner />;
  if (httpStatus === 404) return <Navigate replace to="/not-found" />;
  if (error.length > 0) return <p className="text-danger text-center my-4">{error[0]}</p>;
  if (!config || !images.length) return null;

  const mergedLabels: GalleryButtonLabels = { ...DEFAULT_LABELS, ...config.labelOverrides };

  const currentItem = config.items[currentIndex] ?? config.items[0];
  const firstItem   = config.items[0];
  const ogImage = (currentItem?.imageUrl || (currentItem ? `${config.baseUrl}${currentItem.fileName}` : ''))
    || (firstItem?.imageUrl || (firstItem ? `${config.baseUrl}${firstItem.fileName}` : ''))
    || siteConfig.seo.defaultImageUrl;
  const ogImageAlt = currentItem?.altText || siteConfig.seo.defaultImageAltText;
  const ogTitle = (imageSlug && currentItem?.title)
    ? `${currentItem.title} — ${config.title} — ${siteConfig.seo.siteName}`
    : `${config.title} — ${siteConfig.seo.siteName}`;

  return (
    <>
      <Helmet>
        <title>{ogTitle}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={siteConfig.seo.defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteConfig.seo.siteName} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={siteConfig.seo.defaultDescription} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta property="og:image:alt" content={ogImageAlt} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={siteConfig.seo.defaultDescription} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        {ogImage && <meta name="twitter:image:alt" content={ogImageAlt} />}
      </Helmet>
      {config.title && <h2 className="text-center my-3">{config.title}</h2>}
      <Carousel images={images} initialIndex={currentIndex} onIndexChange={handleIndexChange} />
      <GalleryActions
        actions={currentItem?.actions}
        labels={mergedLabels}
        itemTitle={currentItem?.title ?? ''}
      />
    </>
  );
};

export default GalleryView;
