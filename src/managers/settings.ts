import { LogLevelDesc } from 'loglevel';
import * as gm from './game-manager';

const toBool = (str: string): boolean => (str === 'false' ? false : !!str);

class Global {
    // User
    isFullScreen = false;
    isVolumeEnabled = false;
    volume = 0;

    // Dev
    readonly isWebGLSpectorEnabled: boolean;
    readonly isBabylonInpectorEnabled: boolean;
    readonly logLevel: LogLevelDesc;
    readonly startScene: gm.GoToType;

    constructor(props: { isWebGLSpectorEnabled: boolean; isBabylonInpectorEnabled: boolean; logLevel: LogLevelDesc; startScene: gm.GoToType }) {
        this.isWebGLSpectorEnabled = props.isWebGLSpectorEnabled;
        this.isBabylonInpectorEnabled = props.isBabylonInpectorEnabled;
        this.logLevel = props.logLevel;
        this.startScene = props.startScene;
    }
}

export const global = new Global({
    isWebGLSpectorEnabled: toBool(import.meta.env.VITE_ENABLE_WEBGL_SPECTOR),
    isBabylonInpectorEnabled: toBool(import.meta.env.VITE_ENABLE_BABYLON_INSPECTOR),
    logLevel: import.meta.env.VITE_LOG_LEVEL as LogLevelDesc,
    startScene: import.meta.env.VITE_START_SCENE as gm.GoToType,
});

class Game {
    name: string;
    email: string;
    character: string;
}

export const game = new Game();
