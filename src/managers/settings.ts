import { LogLevelDesc } from 'loglevel';
import * as gm from './game-manager';
import * as sharedModels from '../models';

export const toBool = (str: string): boolean => (str === 'false' ? false : !!str);

export class Global {
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

export class Game {
    name: string;
    email: string;
    character: sharedModels.CharacterType;
    isFullScreen: boolean;
    isVolumeEnabled: boolean;
    volume: number;

    constructor() {
        this.isFullScreen = false;
        this.isVolumeEnabled = false;
        this.volume = 0;
    }
}

export const game = new Game();
