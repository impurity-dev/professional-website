import { Engine } from '@babylonjs/core';
import Start from '../states/start';
import StateMachine from './state-machine';

export default class GameManager extends StateMachine {
    constructor(private engine: Engine) {
        super();
        this.setState(new Start(this));
        engine.runRenderLoop(() => this.getState().render());
    }

    public getEngine(): Engine {
        return this.engine;
    }
}
