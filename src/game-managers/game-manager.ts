import { Engine } from '@babylonjs/core';
import StartState from '../states/start-state.js';
import StateMachine from './state-machine.js';
import TravelState from '../states/travel-state.js';
import OrbitState from '../states/orbit-state.js';
import MapState from '../states/map-state.js';

export type GoToStartProps = { type: 'start' };
export type GoToTravelProps = { type: 'travel' };
export type GoToOrbitProps = { type: 'orbit' };
export type GoToMapProps = { type: 'map' };
export type GoToProps = GoToStartProps | GoToTravelProps | GoToOrbitProps | GoToMapProps;

export default class GameManager extends StateMachine {
    constructor(
        public readonly canvas: HTMLCanvasElement,
        public readonly engine: Engine,
    ) {
        super();
    }

    async start(): Promise<void> {
        await this.setState(new StartState(this));
        this.engine.runRenderLoop(() => this.getState().render());
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
            default:
                throw new Error(`Invalid goTo state: ${props}`);
        }
    };
}
