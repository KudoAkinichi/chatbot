// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { ChatProvider } from "@/context/ChatContext";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Disability Job Recommendation Chatbot",
  description: "Find job recommendations tailored to your specific needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>

        <ThemeProvider>
          <AccessibilityProvider>
            <ChatProvider>
              <main id="main-content">{children}</main>
              <AccessibilityPanel />
              <div
                id="keyboard-focus-indicator"
                className="keyboard-focus-indicator"
              >
                Keyboard focus mode active
              </div>
            </ChatProvider>
          </AccessibilityProvider>
        </ThemeProvider>

        {/* Script to detect keyboard navigation for better accessibility */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              let usingKeyboard = false;
              let keyboardIndicator = document.getElementById('keyboard-focus-indicator');
              
              document.addEventListener('keydown', e => {
                if (e.key === 'Tab') {
                  usingKeyboard = true;
                  document.body.classList.add('keyboard-navigation');
                  keyboardIndicator.classList.add('visible');
                  setTimeout(() => {
                    keyboardIndicator.classList.remove('visible');
                  }, 2000);
                }
              });
              
              document.addEventListener('mousedown', () => {
                usingKeyboard = false;
                document.body.classList.remove('keyboard-navigation');
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
