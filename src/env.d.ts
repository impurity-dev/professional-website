/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENABLE_WEBGL_SPECTOR: string;
    readonly VITE_ENABLE_BABYLON_INSPECTOR: string;
    readonly VITE_LOG_LEVEL: string;
    readonly VITE_START_SCENE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
