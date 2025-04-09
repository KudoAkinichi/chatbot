"use client";

import React, { useState } from "react";
import { useAccessibility } from "../context/AccessibilityContext";
import { useTheme } from "../context/ThemeContext";
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
  const { isDarkMode } = useTheme();
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

  return (
    <div className="accessibility-container fixed top-1/3 right-0 z-50 font-sans">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="accessibility-toggle flex items-center gap-2 bg-blue-600 text-white border-0 py-2.5 px-4 rounded-l-lg cursor-pointer font-semibold transition-all ease-in-out duration-300 hover:bg-blue-700"
        aria-label={
          isOpen ? "Close accessibility panel" : "Open accessibility panel"
        }
      >
        {isOpen ? (
          <>
            <ChevronRight size={20} /> <span className="sr-only">Close</span>
          </>
        ) : (
          <>
            <ChevronLeft size={20} /> <span>Accessibility</span>
          </>
        )}
      </button>

      {/* Accessibility Panel */}
      <div
        className={`accessibility-panel absolute top-0 right-0 w-70 rounded-l-xl shadow-lg border border-[color:var(--border-color)] bg-[color:var(--card-background)] text-[color:var(--text-primary)] transform transition-transform ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="region"
        aria-label="Accessibility controls"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold">Accessibility Options</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-transparent border-0 text-[color:var(--text-tertiary)] cursor-pointer"
              aria-label="Close panel"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 text-[color:var(--text-secondary)]">
              Text Size
            </h3>
            <div className="flex items-center justify-between bg-[color:var(--input-background)] rounded-lg p-2">
              <button
                onClick={decreaseTextSize}
                className="bg-[color:var(--border-color)] border-0 rounded-md p-1.5 cursor-pointer text-[color:var(--text-primary)] hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <ZoomOut size={18} />
              </button>
              <span className="font-medium">{settings.fontSize}px</span>
              <button
                onClick={increaseTextSize}
                className="bg-[color:var(--border-color)] border-0 rounded-md p-1.5 cursor-pointer text-[color:var(--text-primary)] hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <ZoomIn size={18} />
              </button>
            </div>
          </div>

          <div className="grid gap-2.5 my-4">
            <button
              onClick={toggleGrayscale}
              className={`flex justify-between items-center w-full p-2 rounded-lg border ${
                settings.isGrayscale
                  ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-200"
                  : "bg-[color:var(--input-background)] border-[color:var(--border-color)] text-[color:var(--text-primary)]"
              } font-medium cursor-pointer transition-all duration-200`}
              aria-pressed={settings.isGrayscale}
            >
              <span>Grayscale</span>
              <Contrast size={18} />
            </button>

            <button
              onClick={toggleHighContrast}
              className={`flex justify-between items-center w-full p-2 rounded-lg border ${
                settings.isHighContrast
                  ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-200"
                  : "bg-[color:var(--input-background)] border-[color:var(--border-color)] text-[color:var(--text-primary)]"
              } font-medium cursor-pointer transition-all duration-200`}
              aria-pressed={settings.isHighContrast}
            >
              <span>High Contrast</span>
              <PanelTopClose size={18} />
            </button>

            <button
              onClick={toggleNegativeContrast}
              className={`flex justify-between items-center w-full p-2 rounded-lg border ${
                settings.isNegativeContrast
                  ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-200"
                  : "bg-[color:var(--input-background)] border-[color:var(--border-color)] text-[color:var(--text-primary)]"
              } font-medium cursor-pointer transition-all duration-200`}
              aria-pressed={settings.isNegativeContrast}
            >
              <span>Negative Contrast</span>
              <PanelTop size={18} />
            </button>

            <button
              onClick={toggleLightBackground}
              className={`flex justify-between items-center w-full p-2 rounded-lg border ${
                settings.isLightBackground
                  ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-200"
                  : "bg-[color:var(--input-background)] border-[color:var(--border-color)] text-[color:var(--text-primary)]"
              } font-medium cursor-pointer transition-all duration-200`}
              aria-pressed={settings.isLightBackground}
            >
              <span>Light Background</span>
              <Laptop2 size={18} />
            </button>

            <button
              onClick={toggleUnderlineLinks}
              className={`flex justify-between items-center w-full p-2 rounded-lg border ${
                settings.areLinksUnderlined
                  ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-200"
                  : "bg-[color:var(--input-background)] border-[color:var(--border-color)] text-[color:var(--text-primary)]"
              } font-medium cursor-pointer transition-all duration-200`}
              aria-pressed={settings.areLinksUnderlined}
            >
              <span>Underline Links</span>
              <Underline size={18} />
            </button>

            <button
              onClick={toggleReadableFont}
              className={`flex justify-between items-center w-full p-2 rounded-lg border ${
                settings.isReadableFont
                  ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-200"
                  : "bg-[color:var(--input-background)] border-[color:var(--border-color)] text-[color:var(--text-primary)]"
              } font-medium cursor-pointer transition-all duration-200`}
              aria-pressed={settings.isReadableFont}
            >
              <span>Readable Font</span>
              <span style={{ fontFamily: "serif" }}>Aa</span>
            </button>
          </div>

          <button
            onClick={resetSettings}
            className="flex justify-center items-center gap-2 w-full py-2.5 px-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 border-0 font-semibold cursor-pointer transition-all duration-200 hover:bg-red-200 dark:hover:bg-red-800 mt-2.5"
          >
            <RotateCcw size={18} />
            <span>Reset All</span>
          </button>
        </div>
      </div>
    </div>
  );
}
