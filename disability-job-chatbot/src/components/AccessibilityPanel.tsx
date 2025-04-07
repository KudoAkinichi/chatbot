"use client";

import React, { useState } from "react";
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

  return (
    <div className="fixed top-1/3 right-0 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-600 text-white p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={
          isOpen ? "Close accessibility panel" : "Open accessibility panel"
        }
      >
        {isOpen ? (
          <>
            <ChevronRight size={24} /> <span className="sr-only">Close</span>
          </>
        ) : (
          <>
            <ChevronLeft size={24} /> <span>Accessibility</span>
          </>
        )}
      </button>

      {/* Accessibility Panel */}
      <div
        className={`absolute top-0 right-0 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 w-64 bg-white dark:bg-gray-800 rounded-l-lg shadow-lg border-l border-t border-b border-gray-300 dark:border-gray-600`}
        role="region"
        aria-label="Accessibility controls"
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
            Accessibility Options
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Close panel"
            >
              <ChevronRight size={20} />
            </button>
          </h2>

          <div className="space-y-4">
            {/* Text Size Controls */}
            <div>
              <h3 className="font-medium mb-2">Text Size</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseTextSize}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 flex-1 flex justify-center"
                  aria-label="Decrease text size"
                >
                  <ZoomOut size={18} />
                </button>
                <span className="text-sm">{settings.fontSize}px</span>
                <button
                  onClick={increaseTextSize}
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 flex-1 flex justify-center"
                  aria-label="Increase text size"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-2">
              <button
                onClick={toggleGrayscale}
                className={`flex items-center justify-between w-full p-2 rounded ${
                  settings.isGrayscale
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
                aria-pressed={settings.isGrayscale}
              >
                <span>Grayscale</span>
                <Contrast size={18} />
              </button>

              <button
                onClick={toggleHighContrast}
                className={`flex items-center justify-between w-full p-2 rounded ${
                  settings.isHighContrast
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
                aria-pressed={settings.isHighContrast}
              >
                <span>High Contrast</span>
                <PanelTopClose size={18} />
              </button>

              <button
                onClick={toggleNegativeContrast}
                className={`flex items-center justify-between w-full p-2 rounded ${
                  settings.isNegativeContrast
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
                aria-pressed={settings.isNegativeContrast}
              >
                <span>Negative Contrast</span>
                <PanelTop size={18} />
              </button>

              <button
                onClick={toggleLightBackground}
                className={`flex items-center justify-between w-full p-2 rounded ${
                  settings.isLightBackground
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
                aria-pressed={settings.isLightBackground}
              >
                <span>Light Background</span>
                <Laptop2 size={18} />
              </button>

              <button
                onClick={toggleUnderlineLinks}
                className={`flex items-center justify-between w-full p-2 rounded ${
                  settings.areLinksUnderlined
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
                aria-pressed={settings.areLinksUnderlined}
              >
                <span>Underline Links</span>
                <Underline size={18} />
              </button>

              <button
                onClick={toggleReadableFont}
                className={`flex items-center justify-between w-full p-2 rounded ${
                  settings.isReadableFont
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
                aria-pressed={settings.isReadableFont}
              >
                <span>Readable Font</span>
                <span className="font-serif">Aa</span>
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetSettings}
              className="flex items-center justify-center gap-2 w-full p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-800"
              aria-label="Reset all accessibility settings"
            >
              <RotateCcw size={18} />
              <span>Reset All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
