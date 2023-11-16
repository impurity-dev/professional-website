import { HemisphericLight, Vector3 } from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from './state.js';
import { StartWorld } from '../environments/start-world.js';
import { FirstPersonController } from '../controllers/first-person-controller.js';
import * as models from '../entities/model.js';

export class StartState extends State {
    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        const framesPerSecond = 60;
        const gravity = -9.81;
        scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
        scene.collisionsEnabled = true;
        scene.onPointerDown = (event) => {
            if (event.button === 0) scene.getEngine().enterPointerlock();
            if (event.button === 1) scene.getEngine().exitPointerlock();
        };

        new StartWorld(scene, entityManager);
        const doorway = models.doorDoubleWall({ scene, entityManager });
        const loadAssets = this.entityManager.load();

        new FirstPersonController(scene);

        // const dL = new DirectionalLight('directionalLight', new Vector3(1, 0, 1), this.scene);
        // dL.diffuse = new Color3(1, 0, 0);
        // dL.specular = new Color3(1, 1, 0);
        // dL.intensity = 0.05;
        // new ShadowGenerator(1024, dL);
        new IntroSound(scene);
        new HemisphericLight('hemispheric-light', new Vector3(0, 1, 0), this.scene);
        new SpaceSkybox(scene);

        await loadAssets;
        doorway.doors.openAsync(true);
    };
}
