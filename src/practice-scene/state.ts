import { ArcRotateCamera, HemisphericLight, Vector3 } from '@babylonjs/core';
import { PlanetEntity } from '../entities/planet-entity.js';
import * as skyboxes from '../shared/skyboxes.js';
import { State } from '../shared/state.js';

export class PracticeState extends State {
    run = async (): Promise<void> => {
        const { scene } = this;
        const position = new Vector3(0, 15, 50);
        const camera = new ArcRotateCamera('ArcFollowCamera', 0, Math.PI / 2.5, 100, position, scene);
        scene.activeCamera = camera;

        const planetDiameter = 1000;
        const planet = new PlanetEntity(scene, planetDiameter);
        planet.position = position.add(new Vector3(-planetDiameter * 2, -planetDiameter / 2, 0));
        setInterval(() => {
            planet.rotate(new Vector3(0, 1, 0), 0.025);
        }, 10);

        new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
        skyboxes.purpleSpace({ scene });
    };
}
