import { Engine } from '@babylonjs/core';
import StartState from '../states/start-state.js';
import StateMachine, { GoToProps } from './state-machine.js';
import TravelState from '../states/travel-state.js';
import OrbitState from '../states/orbit-state.js';
import MapState from '../states/map-state.js';
import PracticeState from '../states/practice-state.js';

export default class GameManager extends StateMachine {
    constructor(
        public readonly canvas: HTMLCanvasElement,
        public readonly engine: Engine,
    ) {
        super();
    }

    goTo = async (props: GoToProps): Promise<void> => {
        switch (props.type) {
            case 'start':
                return this.setState(new StartState(this));
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
