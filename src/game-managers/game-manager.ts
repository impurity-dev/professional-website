import { Engine } from '@babylonjs/core';
import StartState from '../states/start-state';
import TravelState from '../states/travel-state';
import StateMachine from './state-machine';

export default class GameManager extends StateMachine {
    constructor(public readonly canvas: HTMLCanvasElement, public readonly engine: Engine) {
        super();
    }

    async start(): Promise<void> {
        this.setState(new StartState(this));
        this.engine.runRenderLoop(() => this.getState().render());
    }
}
