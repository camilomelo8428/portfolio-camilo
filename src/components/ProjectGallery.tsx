"use client";

import { useState } from "react";
import { assetUrl } from "@/lib/assets";

type ProjectGalleryProps = {
  images: string[];
  alt: string;
};

/**
 * Galeria simples com setas e indicadores para o card do projeto.
 */
export function ProjectGallery({ images, alt }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index] ?? images[0];

  if (!current) {
    return null;
  }

  const goPrevious = () => {
    setIndex((previous) => (previous - 1 + total) % total);
  };

  const goNext = () => {
    setIndex((previous) => (previous + 1) % total);
  };

  return (
    <div className="project-card__media project-card__media--gallery">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetUrl(current)}
        alt={`${alt} (${index + 1}/${total})`}
        width={1200}
        height={675}
        loading="lazy"
        className="project-card__image"
      />

      {total > 1 ? (
        <>
          <button
            type="button"
            className="project-gallery__nav project-gallery__nav--prev"
            aria-label="Imagem anterior"
            onClick={(event) => {
              event.stopPropagation();
              goPrevious();
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="project-gallery__nav project-gallery__nav--next"
            aria-label="Proxima imagem"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
          >
            ›
          </button>
          <div className="project-gallery__dots" role="tablist">
            {images.map((image, dotIndex) => (
              <button
                key={image}
                type="button"
                role="tab"
                aria-selected={dotIndex === index}
                aria-label={`Imagem ${dotIndex + 1}`}
                className={`project-gallery__dot ${dotIndex === index ? "is-active" : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                  setIndex(dotIndex);
                }}
              />
            ))}
          </div>
          <span className="project-gallery__counter">
            {index + 1}/{total}
          </span>
        </>
      ) : null}
    </div>
  );
}
