import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import useHttp from '../../UseHttp/useHttp';
import Spinner from '../../Spinner/Spinner';
import Card from '../../Card/Card';
import { GalleryManifest, GalleryEntry } from '../models/GalleryManifest';

import siteConfig from '../../ConfigFiles/site.config.json';
import styles from './GalleryIndex.module.css';

const GalleryIndex: React.FC = () => {
  const [galleries, setGalleries] = useState<GalleryEntry[]>([]);
  const [title, setTitle] = useState('');
  const { sendRequest, isLoading, error } = useHttp();

  useEffect(() => {
    sendRequest(
      { url: `${siteConfig.dataBaseUrl}galleries.json`, cacheAge: siteConfig.cacheAgeMs, cacheVersion: siteConfig.cacheVersion },
      (data: GalleryManifest) => {
        setTitle(data.title);
        setGalleries(data.galleries);
      }
    );
  }, [sendRequest]);

  if (isLoading) return <Spinner />;
  if (error.length > 0) return <p className="text-danger text-center my-4">{error[0]}</p>;

  const { siteName, defaultDescription, defaultImageUrl, defaultImageAltText } = siteConfig.seo;

  return (
    <>
      <Helmet>
        <title>{siteName}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={defaultDescription} />
        {defaultImageUrl && <meta property="og:image" content={defaultImageUrl} />}
        {defaultImageUrl && <meta property="og:image:alt" content={defaultImageAltText} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={defaultDescription} />
        {defaultImageUrl && <meta name="twitter:image" content={defaultImageUrl} />}
        {defaultImageUrl && <meta name="twitter:image:alt" content={defaultImageAltText} />}
      </Helmet>
      <div className="my-4">
        {title && <h1 className="text-center mb-4">{title}</h1>}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
          {galleries.map(gallery => (
            <div key={gallery.slug} className="col">
              <Link to={`/gallery/${gallery.slug}`} className={styles.cardLink}>
                <Card cardRounded cardHover cardColor="altPrimary" cardClasses={styles.galleryCard}>
                  {gallery.coverImage && (
                    <img
                      src={gallery.coverImage}
                      className={styles.coverImage}
                      alt={gallery.title}
                    />
                  )}
                  <div className={styles.cardBody}>
                    <h5 className={styles.cardTitle}>{gallery.title}</h5>
                    {gallery.description && (
                      <p className={styles.cardDescription}>{gallery.description}</p>
                    )}
                    <span className={styles.viewBtn}>View Gallery</span>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GalleryIndex;
