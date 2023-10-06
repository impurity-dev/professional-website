import { ArcRotateCamera, HemisphericLight, Vector3 } from '@babylonjs/core';
import PlanetEntity from '../entities/planet-entity.js';
import SpaceSkybox from '../skyboxes/space-skybox.js';
import State from './state.js';

export class PracticeState extends State {
    private planet: PlanetEntity;
    private camera: ArcRotateCamera;

    run = async (): Promise<void> => {
        const position = new Vector3(0, 15, 50);
        this.camera = new ArcRotateCamera('ArcFollowCamera', 0, Math.PI / 2.5, 100, position, this.scene);
        this.scene.activeCamera = this.camera;

        const planetDiameter = 1000;
        this.planet = new PlanetEntity(this.scene, planetDiameter);
        this.planet.position = position.add(new Vector3(-planetDiameter * 2, -planetDiameter / 2, 0));
        // setInterval(() => {
        //     this.planet.rotate(new Vector3(0, 1, 0), 0.025);
        // }, 10);

        new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene);
        new SpaceSkybox(this.scene);
    };
}
