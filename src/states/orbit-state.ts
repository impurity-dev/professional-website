import { ArcRotateCamera, Color4, HemisphericLight, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import OrbitGui from '../guis/orbit-gui';
import SpaceSkybox from '../skyboxes/space-skybox';
import State from './state';
import TravelState from './travel-state';

export default class Orbit extends State {
    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        const camera: ArcRotateCamera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
        camera.setTarget(Vector3.Zero());

        MeshBuilder.CreateSphere('sphere', { diameter: 1 }, this.scene);

        new OrbitGui(this.scene, () => {
            this.goToTravel();
        });

        new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene);
        new SpaceSkybox(this.scene);

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
    }

    async goToTravel(): Promise<void> {
        this.gameManager.setState(new TravelState(this.gameManager));
        this.dispose();
    }
}
