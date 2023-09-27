const toBool = (str: string): boolean => (str === 'false' ? false : !!str);
export const env = {
    isWebGLSpectorEnabled: toBool(import.meta.env.VITE_ENABLE_WEBGL_SPECTOR),
    isBabylonInpectorEnabled: toBool(import.meta.env.VITE_ENABLE_BABYLON_INSPECTOR),
};
