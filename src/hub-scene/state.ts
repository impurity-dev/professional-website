import * as BABYLON from '@babylonjs/core';
import { SpaceSkybox } from '../shared/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from '../shared/state.js';
import * as worlds from './worlds.js';
import * as controllers from './inputs.js';
import * as guis from './guis.js';
import * as events from './events.js';

export class HubState extends State {
    private isLaunchable = false;

    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        const event = new events.HubEvents();
        const controller = new controllers.FPSController({ scene, location: new BABYLON.Vector3(-20, 2, 1), target: new BABYLON.Vector3(2, 2, 0), event });
        const world = new worlds.StartWorld({ scene, entityManager, event });
        const gui = new guis.HubGui({ scene, event });
        event.onTrigger.add(({ toggle }) => (this.isLaunchable = toggle));
        event.onAction.add(() => {
            if (!this.isLaunchable) return;
            this.gameManager.goTo({ type: 'fighter' });
        });
        await this.entityManager.load();
        new IntroSound(scene);
        new SpaceSkybox(scene);
    };
}
