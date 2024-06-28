import * as BABYLON from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { State } from '../states/state.js';
import { FighterController } from './inputs.js';
import { FighterWorld } from './world.js';
import { FighterCamera } from './camera.js';

export class FighterState extends State {
    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        const world = new FighterWorld({ scene, entityManager });
        const camera = new FighterCamera({ scene, target: world.fighter });
        const controller = new FighterController({ scene });
        await this.entityManager.load();
        new SpaceSkybox(scene);
    };
}
