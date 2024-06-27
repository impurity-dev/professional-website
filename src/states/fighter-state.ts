import * as BABYLON from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { State } from './state.js';
import { FighterController } from '../controllers/fighter-controller.js';
import { FighterWorld } from '../environments/fighter-world.js';

export class FighterState extends State {
    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        const world = new FighterWorld(scene, entityManager);
        const controller = new FighterController(scene, world.fighter);
        await this.entityManager.load();
        new SpaceSkybox(scene);

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), this.scene);
        light.intensity = 0.3;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };
}
