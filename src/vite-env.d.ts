/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_PRIMARY_COLOR: string
  readonly VITE_PRIMARY_LIGHT: string
  readonly VITE_PRIMARY_DARK: string
  readonly VITE_SECONDARY_COLOR: string
  readonly VITE_BACKGROUND_COLOR: string
  readonly VITE_PAPER_COLOR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
