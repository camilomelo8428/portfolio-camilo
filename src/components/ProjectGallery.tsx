"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { assetUrl } from "@/lib/assets";

type ProjectGalleryProps = {
  images: string[];
  alt: string;
  /** Se false, mostra so a capa sem controles. */
  interactive?: boolean;
  expandImageLabel?: string;
  closeLightboxLabel?: string;
};

/**
 * Lightbox fullscreen para visualizar imagens ampliadas.
 */
function ImageLightbox({
  images,
  alt,
  startIndex,
  closeLabel,
  onClose,
}: {
  images: string[];
  alt: string;
  startIndex: number;
  closeLabel: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const total = images.length;
  const current = images[index] ?? images[0];

  const goPrevious = useCallback(() => {
    setIndex((previous) => (previous - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((previous) => (previous + 1) % total);
  }, [total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        goPrevious();
      }
      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goNext, goPrevious, onClose]);

  if (!current) {
    return null;
  }

  return (
    <div
      className="project-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="project-lightbox__close"
        aria-label={closeLabel}
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>

      {total > 1 ? (
        <>
          <button
            type="button"
            className="project-lightbox__nav project-lightbox__nav--prev"
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
            className="project-lightbox__nav project-lightbox__nav--next"
            aria-label="Proxima imagem"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
          >
            ›
          </button>
        </>
      ) : null}

      <figure
        className="project-lightbox__figure"
        onClick={(event) => event.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetUrl(current)}
          alt={`${alt} (${index + 1}/${total})`}
          className="project-lightbox__image"
        />
        {total > 1 ? (
          <figcaption className="project-lightbox__caption">
            {index + 1} / {total}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}

/**
 * Galeria do projeto: capa unica ou carrossel com navegacao e lightbox.
 */
export function ProjectGallery({
  images,
  alt,
  interactive = true,
  expandImageLabel = "Ampliar imagem",
  closeLightboxLabel = "Fechar",
}: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
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

  const openLightbox = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setLightboxOpen(true);
  };

  return (
    <>
      <div
        className={`project-card__media ${showControls ? "project-card__media--gallery" : ""}`}
      >
        {interactive ? (
          <button
            type="button"
            className="project-gallery__image-btn"
            aria-label={expandImageLabel}
            onClick={openLightbox}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetUrl(current)}
              alt={showControls ? `${alt} (${index + 1}/${total})` : alt}
              width={1200}
              height={675}
              loading="lazy"
              className="project-card__image"
            />
          </button>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={assetUrl(current)}
            alt={alt}
            width={1200}
            height={675}
            loading="lazy"
            className="project-card__image"
          />
        )}

        {interactive ? (
          <button
            type="button"
            className="project-gallery__expand"
            aria-label={expandImageLabel}
            onClick={openLightbox}
          >
            ⤢
          </button>
        ) : null}

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

      {lightboxOpen ? (
        <ImageLightbox
          images={images}
          alt={alt}
          startIndex={index}
          closeLabel={closeLightboxLabel}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </>
  );
}
