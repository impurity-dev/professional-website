import { ArcRotateCamera, HemisphericLight, Vector3 } from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { State } from './state.js';
import * as models from '../entities/model.js';

export class MenuState extends State {
    private camera: ArcRotateCamera;

    run = async (): Promise<void> => {
        const earth = this.earth();
        earth.transform.position = Vector3.Zero();
        this.camera = new ArcRotateCamera('ArcRotateCamera', Math.PI / 2, Math.PI / 2.5, 250, earth.transform.position, this.scene);
        this.camera.setTarget(earth.transform.position);
        this.scene.activeCamera = this.camera;
        // new IntroSound(this.scene);
        earth.transform.scaling = new Vector3(0.1, 0.1, 0.1);

        await this.entityManager.load();
        new HemisphericLight('LightSource', new Vector3(1, 1, 0), this.scene);
        new SpaceSkybox(this.scene);
    };

    earth = () => {
        const { scene, entityManager } = this;
        return models.earth({ scene, entityManager });
    };
}
