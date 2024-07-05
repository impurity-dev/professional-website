import * as BABYLON from '@babylonjs/core';
import { SpaceSkybox } from '../shared/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from '../states/state.js';
import * as worlds from './worlds.js';
import * as controllers from './inputs.js';
import { Start2Gui } from './gui.js';
import * as events from './events.js';

export class StartState extends State {
    private isLaunchable = false;

    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        const event = new events.MissionControlEvents();
        const controller = new controllers.FPSController(scene, new BABYLON.Vector3(-20, 2, 1), new BABYLON.Vector3(2, 2, 0));
        const world = new worlds.StartWorld(scene, entityManager);
        const gui = new Start2Gui(scene, {});
        world.onLaunchOptions.add((toggle) => {
            gui.triggerAction.notifyObservers({ type: 'launch', toggle });
            this.isLaunchable = toggle;
        });
        controller.onActionPressed.add(() => {
            if (!this.isLaunchable) return;
            this.gameManager.goTo({ type: 'fighter' });
        });
        await this.entityManager.load();
        new IntroSound(scene);
        new SpaceSkybox(scene);

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), this.scene);
        light.intensity = 0.3;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };
}
