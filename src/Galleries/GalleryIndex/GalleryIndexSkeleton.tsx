import styles from './GalleryIndexSkeleton.module.css';
import type { GalleryManifest } from '../models/GalleryManifest';
import type CachedItem from '../../UseHttp/CachedItem';

export function getCachedGalleryCount(cacheKey: string, fallback = 3): number {
  try {
    const raw = sessionStorage.getItem(cacheKey);
    if (!raw) return fallback;
    const item = JSON.parse(raw) as CachedItem;
    if (item.timestamp < Date.now()) return fallback;
    return (item.data as GalleryManifest).galleries?.length ?? fallback;
  } catch {
    return fallback;
  }
}

const GalleryIndexSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="col">
        <div className={styles.skeletonCard}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonBody}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonBtn} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default GalleryIndexSkeleton;
