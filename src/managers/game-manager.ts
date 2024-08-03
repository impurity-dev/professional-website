import * as BABYLON from '@babylonjs/core';
import * as SPECTOR from 'spectorjs';
import * as character from '../scene-character/state.js';
import * as credits from '../scene-credits/state.js';
import * as fighter from '../scene-fighter/state.js';
import * as hub from '../scene-hub/state.js';
import * as launch from '../scene-launch/state.js';
import * as practice from '../scene-practice/state.js';
import * as menu from '../scene-menu/state.js';
import * as logger from '../shared/logger.js';
import * as sm from '../shared/state-machines.js';
import * as settings from './settings.js';
import * as states from './states.js';

export type GoToType = 'menu' | 'orbit' | 'launch' | 'travel' | 'orbit' | 'practice' | 'map' | 'hub' | 'fighter' | 'credits' | 'character';
export type GoToProps = { type: GoToType };
export class GameManager extends sm.StateMachine<states.State, GoToProps> {
    constructor(
        public readonly canvas: HTMLCanvasElement,
        public readonly engine: BABYLON.Engine,
    ) {
        super();
        if (settings.global.isWebGLSpectorEnabled) {
            new SPECTOR.Spector().displayUI();
        }
    }

    goTo = async (props: GoToProps): Promise<void> => {
        logger.debug('Going to ' + props.type);
        switch (props.type) {
            case 'menu':
                return this.setState(new menu.State(this));
            case 'hub':
                return this.setState(new hub.State(this));
            case 'launch':
                return this.setState(new launch.State(this));
            case 'fighter':
                return this.setState(new fighter.State(this));
            case 'character':
                return this.setState(new character.State(this));
            case 'practice':
                return this.setState(new practice.State(this));
            case 'credits':
                return this.setState(new credits.State(this));
            default:
                throw new Error(`Invalid goTo state: ${props}`);
        }
    };

    protected setState = async (state: states.State): Promise<void> => {
        const oldState = this.state;
        this.state = state;
        await this.state.start();
        if (oldState) oldState.dispose();
    };
}
