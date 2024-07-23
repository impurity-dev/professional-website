import * as BABYLON from '@babylonjs/core';
import * as SPECTOR from 'spectorjs';
import * as character from '../scene-character/state.js';
import * as creditsScene from '../scene-credits/state.js';
import * as fighterScene from '../scene-fighter/index.js';
import * as hubScene from '../scene-hub/state.js';
import * as launchScene from '../scene-launch/state.js';
import * as practiceScene from '../scene-practice/state.js';
import * as startScene from '../scene-start/state.js';
import * as logger from '../shared/logger.js';
import * as settings from './settings-manager.js';
import * as sm from './state-machine.js';

export class GameManager extends sm.StateMachine {
    constructor(
        public readonly canvas: HTMLCanvasElement,
        public readonly engine: BABYLON.Engine,
    ) {
        super();
        if (settings.manager.isWebGLSpectorEnabled) {
            new SPECTOR.Spector().displayUI();
        }
    }

    goTo = async (props: sm.GoToProps): Promise<void> => {
        logger.debug('Going to ' + props.type);
        switch (props.type) {
            case 'menu':
                return this.setState(new startScene.MenuState(this));
            case 'hub':
                return this.setState(new hubScene.HubState(this));
            case 'launch':
                return this.setState(new launchScene.LaunchState(this));
            case 'fighter':
                return this.setState(new fighterScene.FighterState(this));
            case 'character':
                return this.setState(new character.State(this));
            case 'practice':
                return this.setState(new practiceScene.PracticeState(this));
            case 'credits':
                return this.setState(new creditsScene.CreditsState(this));
            default:
                throw new Error(`Invalid goTo state: ${props}`);
        }
    };
}
