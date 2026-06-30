import styles from './GalleryIndexSkeleton.module.css';

const SKELETON_COUNT = 3;

const GalleryIndexSkeleton: React.FC = () => (
  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 justify-content-center">
    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
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
