import { Engine } from '@babylonjs/core';
import { LaunchState } from '../states/launch-state.js';
import { StateMachine, GoToProps } from './state-machine.js';
import { TravelState } from '../states/travel-state.js';
import { OrbitState } from '../states/orbit-state.js';
import { MapState } from '../states/map-state.js';
import { PracticeState } from '../states/practice-state.js';
import { Spector } from 'spectorjs';
import { env } from './env-manager.js';
import { StartState } from '../states/start-state.js';
import { MenuState } from '../states/menu-state.js';
import { FighterState } from '../fighter-minigame';
import { logger } from '../helpers/logger.js';
import { SettingsManager } from './settings-manager.js';

export class GameManager extends StateMachine {
    constructor(
        public readonly canvas: HTMLCanvasElement,
        public readonly engine: Engine,
        public readonly settings: SettingsManager,
    ) {
        super();
        if (env.isWebGLSpectorEnabled) {
            const spector = new Spector();
            spector.displayUI();
        }
    }

    goTo = async (props: GoToProps): Promise<void> => {
        logger.debug('Going to ' + props.type);
        switch (props.type) {
            case 'menu':
                return this.setState(new MenuState(this));
            case 'start':
                return this.setState(new StartState(this));
            case 'launch':
                return this.setState(new LaunchState(this));
            case 'travel':
                return this.setState(new TravelState(this));
            case 'orbit':
                return this.setState(new OrbitState(this));
            case 'map':
                return this.setState(new MapState(this));
            case 'fighter':
                return this.setState(new FighterState(this));
            case 'practice':
                return this.setState(new PracticeState(this));
            default:
                throw new Error(`Invalid goTo state: ${props}`);
        }
    };
}
