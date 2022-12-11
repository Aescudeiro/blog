/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NHOST_SUBDOMAIN: string;
  readonly NHOST_REGION: string;
  readonly NHOST_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
