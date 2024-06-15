import * as BABYLON from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from './state.js';
import { StartWorld } from '../environments/start-world.js';
import { FirstPersonController } from '../controllers/first-person-controller.js';

export class StartState extends State {
    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        new FirstPersonController(scene, new BABYLON.Vector3(-20, 2, 1), new BABYLON.Vector3(2, 2, 0));
        const world = new StartWorld(scene, entityManager);
        await this.entityManager.load();
        world.entryDoor.doors.openAsync(true);
        new IntroSound(scene);
        new SpaceSkybox(scene);

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), this.scene);
        light.intensity = 0.3;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };
}
