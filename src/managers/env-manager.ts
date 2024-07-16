import { LogLevelDesc } from 'loglevel';
import { GoToType } from './state-machine';

const toBool = (str: string): boolean => (str === 'false' ? false : !!str);
export const env = {
    isWebGLSpectorEnabled: toBool(import.meta.env.VITE_ENABLE_WEBGL_SPECTOR),
    isBabylonInpectorEnabled: toBool(import.meta.env.VITE_ENABLE_BABYLON_INSPECTOR),
    logLevel: import.meta.env.VITE_LOG_LEVEL as LogLevelDesc,
    startScene: import.meta.env.VITE_START_SCENE as GoToType,
};
