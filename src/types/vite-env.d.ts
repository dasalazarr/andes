/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_LANG: string;
  readonly VITE_TEMPO: string;
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global window extensions
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    ttq?: any;
  }
}
