import { FreeCamera, HemisphericLight, Vector3, DirectionalLight, Color3, ShadowGenerator, SpotLight } from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from './state.js';
import { EntityManager } from '../managers/entity-manager.js';
import { StartEnvironment } from '../environments/start-environment.js';

export class StartState extends State {
    run = async (): Promise<void> => {
        const entityManager = new EntityManager(this.assetManager);
        const startEnvironment = new StartEnvironment(this.scene, entityManager);
        const environmentLoad = startEnvironment.load();

        const camera = new FreeCamera('Camera', new Vector3(0, 5, 0), this.scene);
        camera.setTarget(new Vector3(5, 5, 0));
        camera.attachControl();

        const dL = new DirectionalLight('directionalLight', new Vector3(1, 0, 1), this.scene);
        dL.diffuse = new Color3(1, 0, 0);
        dL.specular = new Color3(1, 1, 0);

        const sL = new SpotLight('spotLight', new Vector3(5, 5, 5), new Vector3(1, 0, 0), Math.PI, 5, this.scene);
        sL.intensity = 1000;

        new ShadowGenerator(1024, dL);
        new IntroSound(this.scene);
        // new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        new SpaceSkybox(this.scene);

        await environmentLoad;
    };
}
