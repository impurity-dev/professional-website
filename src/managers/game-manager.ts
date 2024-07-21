import * as BABYLON from '@babylonjs/core';
import * as SPECTOR from 'spectorjs';
import * as characterScene from '../character-scene/state.js';
import * as creditsScene from '../credits-scene/state.js';
import * as fighterScene from '../fighter-scene/index.js';
import * as hubScene from '../hub-scene/state.js';
import * as launchScene from '../launch-scene/state.js';
import * as practiceScene from '../practice-scene/state.js';
import * as logger from '../shared/logger.js';
import * as startScene from '../start-scene/state.js';
import { MapState } from '../states/map-state.js';
import { OrbitState } from '../states/orbit-state.js';
import { TravelState } from '../states/travel-state.js';
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
            case 'travel':
                return this.setState(new TravelState(this));
            case 'orbit':
                return this.setState(new OrbitState(this));
            case 'map':
                return this.setState(new MapState(this));
            case 'fighter':
                return this.setState(new fighterScene.FighterState(this));
            case 'character':
                return this.setState(new characterScene.CharacterState(this));
            case 'practice':
                return this.setState(new practiceScene.PracticeState(this));
            case 'credits':
                return this.setState(new creditsScene.CreditsState(this));
            default:
                throw new Error(`Invalid goTo state: ${props}`);
        }
    };
}
