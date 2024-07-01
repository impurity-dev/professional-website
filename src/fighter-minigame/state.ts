import * as BABYLON from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { State } from '../states/state.js';
import { FighterController } from './inputs.js';
import { FighterWorld } from './world.js';
import { FighterCamera } from './camera.js';
import { FighterEvents } from './events.js';

export class FighterState extends State {
    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        const events = new FighterEvents();
        const world = new FighterWorld({ scene, entityManager, events });
        const camera = new FighterCamera({ scene, target: world.fighterModel });
        const controller = new FighterController({ scene, events });
        await this.entityManager.load();
        new SpaceSkybox(scene);
    };
}
