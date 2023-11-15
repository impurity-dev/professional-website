import { Vector3, DirectionalLight, Color3, ShadowGenerator, SpotLight } from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from './state.js';
import { EntityManager } from '../managers/entity-manager.js';
import { StartWorld } from '../environments/start-world.js';
import { FirstPersonController } from '../controllers/first-person-controller.js';

export class StartState extends State {
    run = async (): Promise<void> => {
        const framesPerSecond = 60;
        const gravity = -9.81;
        this.scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
        this.scene.collisionsEnabled = true;
        this.scene.onPointerDown = (event) => {
            if (event.button === 0) this.scene.getEngine().enterPointerlock();
            if (event.button === 1) this.scene.getEngine().exitPointerlock();
        };

        const entityManager = new EntityManager(this.assetManager);
        new StartWorld(this.scene, entityManager);
        const loadAssets = entityManager.load();

        new FirstPersonController(this.scene);

        // const dL = new DirectionalLight('directionalLight', new Vector3(1, 0, 1), this.scene);
        // dL.diffuse = new Color3(1, 0, 0);
        // dL.specular = new Color3(1, 1, 0);
        // dL.intensity = 0.05;
        // new ShadowGenerator(1024, dL);
        new IntroSound(this.scene);
        // new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        new SpaceSkybox(this.scene);

        await loadAssets;
    };
}
