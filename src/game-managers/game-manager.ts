import { Engine } from '@babylonjs/core';
import Start from '../states/start-state';
import StateMachine from './state-machine';

export default class GameManager extends StateMachine {
    constructor(public readonly canvas: HTMLCanvasElement, public readonly engine: Engine) {
        super();
        this.state = new Start(this);
        engine.runRenderLoop(() => this.state.render());
    }
}