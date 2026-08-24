"use client";

import { useState } from "react";
import { assetUrl } from "@/lib/assets";

type ProjectGalleryProps = {
  images: string[];
  alt: string;
  /** Se false, mostra so a capa sem controles. */
  interactive?: boolean;
};

/**
 * Galeria do projeto: capa unica ou carrossel com navegacao.
 */
export function ProjectGallery({
  images,
  alt,
  interactive = true,
}: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[interactive ? index : 0] ?? images[0];

  if (!current) {
    return null;
  }

  const showControls = interactive && total > 1;

  const goPrevious = () => {
    setIndex((previous) => (previous - 1 + total) % total);
  };

  const goNext = () => {
    setIndex((previous) => (previous + 1) % total);
  };

  return (
    <div
      className={`project-card__media ${showControls ? "project-card__media--gallery" : ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetUrl(current)}
        alt={
          showControls ? `${alt} (${index + 1}/${total})` : alt
        }
        width={1200}
        height={675}
        loading="lazy"
        className="project-card__image"
      />

      {showControls ? (
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
