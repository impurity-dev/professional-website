/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENABLE_WEBGL_SPECTOR: string;
    readonly VITE_ENABLE_BABYLON_INSPECTOR: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
