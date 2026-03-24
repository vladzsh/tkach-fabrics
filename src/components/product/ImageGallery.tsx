"use client";

import { useState } from "react";
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      {/* Desktop: main image + thumbnails */}
      <div className={styles.desktopGallery}>
        <div className={styles.mainImage}>
          {images[activeIndex] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={images[activeIndex]}
              alt={`Product image ${activeIndex + 1}`}
              className={styles.mainImg}
            />
          ) : (
            <span className={styles.placeholder}>{images[activeIndex] ?? "No image"}</span>
          )}
        </div>
        {images.length > 1 && (
          <div className={styles.thumbnails}>
            {images.slice(0, 4).map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${i === activeIndex ? styles.thumbActive : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`View image ${i + 1}`}
              >
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt={`Thumbnail ${i + 1}`} className={styles.thumbImg} />
                ) : (
                  <span className={styles.thumbPlaceholder}>{i + 1}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile: horizontal swipeable carousel */}
      <div className={styles.mobileCarousel}>
        {images.map((img, i) => (
          <div key={i} className={styles.slide}>
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={`Product image ${i + 1}`} className={styles.slideImg} />
            ) : (
              <span className={styles.placeholder}>{img ?? `Image ${i + 1}`}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
