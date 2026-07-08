"use client";

import { useState } from "react";

type Props = {
  product: any;
};

export default function ProductGallery({ product }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const image = product?.image;
  const name = product?.name ?? "Product";

  return (
    <>
      <style>{`
        @keyframes pg-shimmer {
          0%   { background-position: -150% 0; }
          100% { background-position: 150% 0; }
        }
        @keyframes pg-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pg-scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }

        .pg-frame {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(184,134,11,0.2);
          background: #FFFDF7;
          box-shadow: 0 10px 30px rgba(91,26,26,0.06);
        }

        .pg-canvas {
          position: relative;
          width: 100%;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          padding: 0;
          cursor: zoom-in;
          overflow: hidden;
        }

        .pg-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0;
          transform: scale(1);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
        }

        .pg-img.pg-img-loaded {
          opacity: 1;
        }

        .pg-canvas:hover .pg-img.pg-img-loaded {
          transform: scale(1.07);
        }

   

        .pg-zoom-hint {
          position: absolute;
          right: 16px;
          bottom: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 100px;
          color: #9A6B0C;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }

        .pg-canvas:hover .pg-zoom-hint {
          opacity: 1;
          transform: translateY(0);
        }

        .pg-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: #B8A990;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
        }

        .pg-lightbox {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(24,12,8,0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          animation: pg-fadeIn 0.25s ease;
        }

        .pg-lightbox-img {
          max-width: 90vw;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
          animation: pg-scaleIn 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pg-lightbox-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.08);
          color: #FBF6EC;
          font-size: 20px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .pg-lightbox-close:hover {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.4);
        }

        @media (prefers-reduced-motion: reduce) {
          .pg-img, .pg-shimmer, .pg-lightbox, .pg-lightbox-img {
            animation: none !important;
            transition: none !important;
          }
        }

        @media (max-width: 600px) {
          .pg-canvas { height: 360px; }
        }
      `}</style>

      <div className="pg-frame">
        <button
          type="button"
          className="pg-canvas"
          onClick={() => image && setLightboxOpen(true)}
          aria-label={image ? `View larger image of ${name}` : "No image available"}
        >
          {image ? (
            <>
              {!loaded && <div className="pg-shimmer" />}
              <img
            src={image}
            alt={name}
            className="pg-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
              <span className="pg-zoom-hint">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                Tap to zoom
              </span>
            </>
          ) : (
            <div className="pg-empty">
              <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <p>Image coming soon</p>
            </div>
          )}
        </button>
      </div>

      {lightboxOpen && image && (
        <div className="pg-lightbox" onClick={() => setLightboxOpen(false)}>
          <button
            type="button"
            className="pg-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={image}
            alt={name}
            className="pg-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
