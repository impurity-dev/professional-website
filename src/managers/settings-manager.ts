class Manager {
    // User
    isFullScreen = false;
    isVolumeEnabled = false;
    volume = 0;

    // Dev
    readonly isWebGLSpectorEnabled: boolean;
    readonly isBabylonInpectorEnabled: boolean;
    readonly logLevel: LogLevelDesc;
    readonly startScene: GoToType;

    constructor(props: { isWebGLSpectorEnabled: boolean; isBabylonInpectorEnabled: boolean; logLevel: LogLevelDesc; startScene: GoToType }) {
        this.isWebGLSpectorEnabled = props.isWebGLSpectorEnabled;
        this.isBabylonInpectorEnabled = props.isBabylonInpectorEnabled;
        this.logLevel = props.logLevel;
        this.startScene = props.startScene;
    }
}

import { LogLevelDesc } from 'loglevel';
import { GoToType } from './state-machine';

const toBool = (str: string): boolean => (str === 'false' ? false : !!str);
export const manager = new Manager({
    isWebGLSpectorEnabled: toBool(import.meta.env.VITE_ENABLE_WEBGL_SPECTOR),
    isBabylonInpectorEnabled: toBool(import.meta.env.VITE_ENABLE_BABYLON_INSPECTOR),
    logLevel: import.meta.env.VITE_LOG_LEVEL as LogLevelDesc,
    startScene: import.meta.env.VITE_START_SCENE as GoToType,
});
