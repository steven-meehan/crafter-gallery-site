import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import parse from 'html-react-parser';

import ImageData from '../Images/ImageData';
import styles from './Carousel.module.css';

interface CarouselProps {
  images: ImageData[];
  initialIndex?: number;
  onIndexChange?: (index: number, title: string) => void;
}

// ── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  image: ImageData;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.lightboxOverlay}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={image.htmlTitle}
    >
      <button className={styles.lightboxClose} onClick={onClose} aria-label="Close lightbox">
        ✕
      </button>

      <div className={styles.lightboxContent}>
        <img
          src={image.imageUrl ?? ''}
          alt={image.htmlAltText}
          className={styles.lightboxImg}
        />

        {image.htmlTitle && (
          <p className={styles.lightboxCaption}>{image.htmlTitle}</p>
        )}

        {image.externalUrl && (
          <a
            href={image.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.lightboxViewBtn}
          >
            View Original ↗
          </a>
        )}
      </div>
    </div>,
    document.body
  );
};

// ── Carousel ─────────────────────────────────────────────────────────────────

const Carousel: React.FC<CarouselProps> = ({ images, initialIndex = 0, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 && initialIndex < images.length ? initialIndex : 0
  );
  const [visible, setVisible] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pointerStartX = useRef<number>(0);
  const pointerStartY = useRef<number>(0);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (initialIndex >= 0 && initialIndex < images.length) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, images.length]);

  useEffect(() => {
    const strip = thumbnailStripRef.current;
    const thumb = thumbRefs.current[currentIndex];
    if (!strip || !thumb) return;
    const stripCenter = strip.offsetWidth / 2;
    const thumbCenter = thumb.offsetLeft + thumb.offsetWidth / 2;
    strip.scrollTo({ left: thumbCenter - stripCenter, behavior: 'smooth' });
  }, [currentIndex]);

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % images.length) + images.length) % images.length;
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex(wrapped);
        setVisible(true);
        onIndexChange?.(wrapped, images[wrapped].htmlTitle ?? '');
      }, 200);
    },
    [images.length, onIndexChange]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
      if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex, goTo, lightboxOpen]);

  if (!images.length) return null;

  const current = images[currentIndex];
  const visibleDescriptions = current.description?.filter(d => d.display) ?? [];

  return (
    <div className={styles.carousel}>

      {/* ── Main stage ── */}
      <div className={styles.stage}>
        <div
          className={styles.imageWrap}
          style={{ opacity: visible ? 1 : 0 }}
          onPointerDown={e => {
            pointerStartX.current = e.clientX;
            pointerStartY.current = e.clientY;
          }}
          onPointerUp={e => {
            const dx = e.clientX - pointerStartX.current;
            const dy = e.clientY - pointerStartY.current;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
              goTo(currentIndex + (dx < 0 ? 1 : -1));
            }
          }}
          onClick={() => setLightboxOpen(true)}
        >
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={e => { e.stopPropagation(); goTo(currentIndex - 1); }}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          <img
            key={current.fileName}
            src={current.imageUrl ?? ''}
            alt={current.htmlAltText}
            className={current.landscape ? styles.landscapeImg : styles.portraitImg}
            draggable={false}
          />

          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={e => { e.stopPropagation(); goTo(currentIndex + 1); }}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          <span className={styles.enlargeHint} aria-hidden="true">⤢</span>
        </div>
      </div>

      {/* ── Caption ── */}
      {current.htmlTitle && (
        <h3 className={styles.caption}>{current.htmlTitle}</h3>
      )}
      {visibleDescriptions.map((d, i) => (
        <p
          key={i}
          className={styles.description}
          style={{ textAlign: d.alignment as React.CSSProperties['textAlign'] }}
        >
          {parse(d.text)}
        </p>
      ))}

      {/* ── Thumbnail strip ── */}
      {images.length > 1 && (
        <div ref={thumbnailStripRef} className={styles.thumbnails} role="list" aria-label="Image thumbnails">
          {images.map((img, i) => (
            <button
              key={img.fileName}
              ref={el => { thumbRefs.current[i] = el; }}
              role="listitem"
              className={`${styles.thumb} ${i === currentIndex ? styles.thumbActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={img.htmlTitle}
              aria-current={i === currentIndex}
            >
              <img src={img.imageUrl ?? ''} alt={img.htmlAltText} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {/* ── Counter + share ── */}
      <div className={styles.counterRow}>
        <p className={styles.counter} aria-live="polite">
          {currentIndex + 1} / {images.length}
        </p>
        <button
          className={styles.shareBtn}
          aria-label="Copy link to this image"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
        >
          {copied ? '✓ Copied!' : '⎘ Share'}
        </button>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <Lightbox image={current} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
};

export default Carousel;
