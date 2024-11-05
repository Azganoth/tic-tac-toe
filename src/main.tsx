import "@fontsource/outfit/500.css";
import "@fontsource/outfit/700.css";
import "modern-normalize";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./assets/scss/styles.scss";
import { TranslationProvider } from "./contexts/TranslationContext.tsx";

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </StrictMode>,
);
