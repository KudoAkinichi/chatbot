"use client";

import React, { useState, useEffect } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Contrast,
  PanelTopClose,
  Laptop2,
  Underline,
  PanelTop,
  RotateCcw,
} from "lucide-react";

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    settings,
    increaseTextSize,
    decreaseTextSize,
    toggleGrayscale,
    toggleHighContrast,
    toggleNegativeContrast,
    toggleLightBackground,
    toggleUnderlineLinks,
    toggleReadableFont,
    resetSettings,
  } = useAccessibility();

  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.style.fontSize = `${settings.fontSize}px`;

    const toggleClass = (condition: boolean, className: string) => {
      if (condition) htmlElement.classList.add(className);
      else htmlElement.classList.remove(className);
    };

    toggleClass(settings.isHighContrast, "high-contrast-mode");
    toggleClass(settings.isGrayscale, "grayscale-mode");
    toggleClass(settings.isNegativeContrast, "negative-contrast-mode");
    toggleClass(settings.isLightBackground, "light-background-mode");
    toggleClass(settings.areLinksUnderlined, "underline-links-mode");
    toggleClass(settings.isReadableFont, "readable-font-mode");
  }, [settings]);

  return (
    <div className="accessibility-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="accessibility-toggle"
        aria-label={isOpen ? "Close accessibility panel" : "Open accessibility panel"}
      >
        {isOpen ? (
          <>
            <ChevronRight size={20} />
            <span className="sr-only">Close</span>
          </>
        ) : (
          <>
            <ChevronLeft size={20} />
            <span>Accessibility</span>
          </>
        )}
      </button>

      <div className={`accessibility-panel ${isOpen ? "open" : ""}`} role="region" aria-label="Accessibility controls">
        <div className="panel-inner">
          <div className="panel-header">
            <h2>Accessibility Options</h2>
            <button onClick={() => setIsOpen(false)} className="close-icon" aria-label="Close panel">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="section">
            <h3>Text Size</h3>
            <div className="text-size-controls">
              <button onClick={decreaseTextSize}><ZoomOut size={18} /></button>
              <span>{settings.fontSize}px</span>
              <button onClick={increaseTextSize}><ZoomIn size={18} /></button>
            </div>
          </div>

          <div className="toggles">
            <button onClick={toggleGrayscale} className={`toggle-btn ${settings.isGrayscale ? "active" : ""}`} aria-pressed={settings.isGrayscale}>
              <span>Grayscale</span>
              <Contrast size={18} />
            </button>

            <button onClick={toggleHighContrast} className={`toggle-btn ${settings.isHighContrast ? "active" : ""}`} aria-pressed={settings.isHighContrast}>
              <span>High Contrast</span>
              <PanelTopClose size={18} />
            </button>

            <button onClick={toggleNegativeContrast} className={`toggle-btn ${settings.isNegativeContrast ? "active" : ""}`} aria-pressed={settings.isNegativeContrast}>
              <span>Negative Contrast</span>
              <PanelTop size={18} />
            </button>

            <button onClick={toggleLightBackground} className={`toggle-btn ${settings.isLightBackground ? "active" : ""}`} aria-pressed={settings.isLightBackground}>
              <span>Light Background</span>
              <Laptop2 size={18} />
            </button>

            <button onClick={toggleUnderlineLinks} className={`toggle-btn ${settings.areLinksUnderlined ? "active" : ""}`} aria-pressed={settings.areLinksUnderlined}>
              <span>Underline Links</span>
              <Underline size={18} />
            </button>

            <button onClick={toggleReadableFont} className={`toggle-btn ${settings.isReadableFont ? "active" : ""}`} aria-pressed={settings.isReadableFont}>
              <span>Readable Font</span>
              <span style={{ fontFamily: "serif" }}>Aa</span>
            </button>
          </div>

          <button onClick={resetSettings} className="reset-btn">
            <RotateCcw size={18} />
            <span>Reset All</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .accessibility-container {
          position: fixed;
          top: 15%;
          right: 0;
          z-index: 9999;
          font-family: system-ui, sans-serif;
        }

        .accessibility-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #2563eb;
          color: #ffffff;
          border: none;
          padding: 10px 16px;
          border-radius: 8px 0 0 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .accessibility-toggle:hover {
          background-color: #1d4ed8;
        }

        .accessibility-panel {
          position: absolute;
          top: 0;
          right: 0;
          width: 280px;
          background-color: #f9fafb;
          color: #111827;
          border-radius: 12px 0 0 12px;
          box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
          border: 1px solid #d1d5db;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }

        .accessibility-panel.open {
          transform: translateX(0%);
        }

        .panel-inner {
          padding: 16px;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .panel-header h2 {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
        }

        .close-icon {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
        }

        .section h3 {
          font-size: 14px;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
        }

        .text-size-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #e5e7eb;
          border-radius: 8px;
          padding: 6px 10px;
          font-weight: 500;
        }

        .text-size-controls button {
          background: #d1d5db;
          border: none;
          border-radius: 6px;
          padding: 6px 8px;
          cursor: pointer;
          color: #111827;
          transition: background 0.2s ease;
        }

        .text-size-controls button:hover {
          background: #9ca3af;
        }

        .toggles {
          margin: 16px 0;
          display: grid;
          gap: 10px;
        }

        .toggle-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          background-color: #f3f4f6;
          border: 1px solid #d1d5db;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          color: #111827;
        }

        .toggle-btn:hover {
          background-color: #e5e7eb;
        }

        .toggle-btn.active {
          background-color: #dbeafe;
          border-color: #60a5fa;
          color: #1e3a8a;
        }

        .reset-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          background-color: #fee2e2;
          color: #b91c1c;
          border: none;
          border-radius: 8px;
          padding: 10px 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          margin-top: 10px;
        }

        .reset-btn:hover {
          background-color: #fecaca;
          color: #7f1d1d;
        }

        @media (prefers-color-scheme: dark) {
          .accessibility-panel {
            background-color: #1f2937;
            color: #f3f4f6;
            border-color: #374151;
          }

          .accessibility-toggle {
            background-color: #3b82f6;
          }

          .accessibility-toggle:hover {
            background-color: #2563eb;
          }

          .panel-header h2,
          .section h3 {
            color: #f3f4f6;
          }

          .text-size-controls {
            background-color: #374151;
          }

          .text-size-controls button {
            background-color: #4b5563;
            color: #f3f4f6;
          }

          .text-size-controls button:hover {
            background-color: #6b7280;
          }

          .toggle-btn {
            background-color: #374151;
            border-color: #4b5563;
            color: #f9fafb;
          }

          .toggle-btn:hover {
            background-color: #4b5563;
            color: #f9fafb;
          }

          .toggle-btn.active {
            background-color: #1e3a8a;
            border-color: #3b82f6;
            color: #ffffff;
          }

          .reset-btn {
            background-color: #7f1d1d;
            color: #fee2e2;
          }

          .reset-btn:hover {
            background-color: #991b1b;
            color: #ffffff;
          }
        }
      `}</style>

      <style jsx global>{`
        html.high-contrast-mode {
          filter: contrast(1.5);
        }

        html.light-background-mode {
          background-color: #ffffff !important;
          color: #000000 !important;
        }

        html.light-background-mode body,
        html.light-background-mode div:not(.accessibility-panel):not(.accessibility-toggle) {
          background-color: #ffffff !important;
          color: #000000 !important;
        }

        html.grayscale-mode {
          filter: grayscale(100%);
        }

        html.negative-contrast-mode {
          background-color: #000000 !important;
          color: #ffffff !important;
          filter: invert(100%) hue-rotate(180deg);
        }

        html.negative-contrast-mode body,
        html.negative-contrast-mode div,
        html.negative-contrast-mode main,
        html.negative-contrast-mode section,
        html.negative-contrast-mode header,
        html.negative-contrast-mode footer {
          background-color: #000000 !important;
          color: #ffffff !important;
        }

        html.negative-contrast-mode img,
        html.negative-contrast-mode video,
        html.negative-contrast-mode svg {
          filter: invert(100%) hue-rotate(180deg);
        }

        html.high-contrast-mode.grayscale-mode {
          filter: contrast(1.5) grayscale(100%);
        }

        html.high-contrast-mode.negative-contrast-mode {
          filter: invert(100%) contrast(1.5) hue-rotate(180deg);
        }

        html.grayscale-mode.negative-contrast-mode {
          filter: invert(100%) grayscale(100%) hue-rotate(180deg);
        }

        html.high-contrast-mode.grayscale-mode.negative-contrast-mode {
          filter: invert(100%) contrast(1.5) grayscale(100%) hue-rotate(180deg);
        }

        html.underline-links-mode a {
          text-decoration: underline !important;
        }

        html.readable-font-mode * {
          font-family: 'Times New Roman', Times, serif !important;
        }
      `}</style>
    </div>
  );
}
