import { Engine } from '@babylonjs/core';
import { LaunchState } from '../states/launch-state.js';
import { StateMachine, GoToProps } from './state-machine.js';
import { TravelState } from '../states/travel-state.js';
import { OrbitState } from '../states/orbit-state.js';
import { MapState } from '../states/map-state.js';
import { PracticeState } from '../states/practice-state.js';
import { LoadingScreen } from '../loading-screens/loading-screen.js';
import { Spector } from 'spectorjs';
import { env } from './env-manager.js';
import { StartState } from '../states/start-state.js';

export class GameManager extends StateMachine {
    constructor(
        public readonly canvas: HTMLCanvasElement,
        public readonly loadingScreen: LoadingScreen,
        public readonly engine: Engine,
    ) {
        super();
        this.engine.loadingScreen = loadingScreen;
        if (env.isWebGLSpectorEnabled) {
            const spector = new Spector();
            spector.displayUI();
        }
    }

    goTo = async (props: GoToProps): Promise<void> => {
        switch (props.type) {
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
            case 'practice':
                return this.setState(new PracticeState(this));
            default:
                throw new Error(`Invalid goTo state: ${props}`);
        }
    };
}
