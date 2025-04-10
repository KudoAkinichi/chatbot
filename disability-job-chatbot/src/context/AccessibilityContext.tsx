"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AccessibilitySettings {
  fontSize: number;
  isGrayscale: boolean;
  isHighContrast: boolean;
  isNegativeContrast: boolean;
  isLightBackground: boolean;
  areLinksUnderlined: boolean;
  isReadableFont: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  isGrayscale: false,
  isHighContrast: false,
  isNegativeContrast: false,
  isLightBackground: false,
  areLinksUnderlined: false,
  isReadableFont: false,
};

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  toggleGrayscale: () => void;
  toggleHighContrast: () => void;
  toggleNegativeContrast: () => void;
  toggleLightBackground: () => void;
  toggleUnderlineLinks: () => void;
  toggleReadableFont: () => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibility-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    }
  }, [settings, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    document.documentElement.style.fontSize = `${settings.fontSize}px`;

    if (settings.isGrayscale) {
      document.body.classList.add("grayscale");
    } else {
      document.body.classList.remove("grayscale");
    }

    if (settings.isHighContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }

    if (settings.isNegativeContrast) {
      document.body.classList.add("negative-contrast");
    } else {
      document.body.classList.remove("negative-contrast");
    }

    if (settings.isLightBackground) {
      document.body.classList.add("light-background");
    } else {
      document.body.classList.remove("light-background");
    }

    if (settings.areLinksUnderlined) {
      document.body.classList.add("underline-links");
    } else {
      document.body.classList.remove("underline-links");
    }

    if (settings.isReadableFont) {
      document.body.classList.add("readable-font");
    } else {
      document.body.classList.remove("readable-font");
    }
  }, [settings, isInitialized]);

  const increaseTextSize = () => {
    setSettings((prev) => ({ ...prev, fontSize: prev.fontSize + 2 }));
  };

  const decreaseTextSize = () => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.max(12, prev.fontSize - 2),
    }));
  };

  const toggleGrayscale = () => {
    setSettings((prev) => ({ ...prev, isGrayscale: !prev.isGrayscale }));
  };

  const toggleHighContrast = () => {
    setSettings((prev) => ({ ...prev, isHighContrast: !prev.isHighContrast }));
  };

  const toggleNegativeContrast = () => {
    setSettings((prev) => ({
      ...prev,
      isNegativeContrast: !prev.isNegativeContrast,
    }));
  };

  const toggleLightBackground = () => {
    setSettings((prev) => ({
      ...prev,
      isLightBackground: !prev.isLightBackground,
    }));
  };

  const toggleUnderlineLinks = () => {
    setSettings((prev) => ({
      ...prev,
      areLinksUnderlined: !prev.areLinksUnderlined,
    }));
  };

  const toggleReadableFont = () => {
    setSettings((prev) => ({ ...prev, isReadableFont: !prev.isReadableFont }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{
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
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
}
