import { ArcRotateCamera, HemisphericLight, Vector3 } from '@babylonjs/core';
import { ShipRockingAnimation } from '../animations/ship-rocking-animation.js';
import { PlanetEntity } from '../entities/planet-entity.js';
import { SpaceShipEntity } from '../entities/spaceship-entity.js';
import { OrbitGui } from '../guis/orbit-gui.js';
import * as skyboxes from '../shared/skyboxes.js';
import { State } from '../managers/states.js';

export class OrbitState extends State {
    private planet: PlanetEntity;
    private spaceship: SpaceShipEntity;
    private camera: ArcRotateCamera;

    run = async (): Promise<void> => {
        const { scene } = this;
        this.spaceship = new SpaceShipEntity(scene);
        this.spaceship.position = Vector3.Zero();
        this.camera = new ArcRotateCamera('ArcFollowCamera', 0, Math.PI / 2.5, 100, this.spaceship.position.add(new Vector3(0, 15, 50)), scene);
        scene.activeCamera = this.camera;

        const planetDiameter = 1000;
        this.planet = new PlanetEntity(scene, planetDiameter);
        // this.planet.position = this.spaceship.position.add(new Vector3(-(planetDiameter / 2 + 100), -50, -100));
        this.planet.position = this.spaceship.position.add(new Vector3(-planetDiameter * 2, -planetDiameter / 2, 0));

        const shipAnimation = new ShipRockingAnimation(10);
        this.spaceship.animations.push(shipAnimation);
        scene.beginAnimation(this.spaceship, 0, 2 * shipAnimation.frameRate, true);

        // const planetAnimation = new PlanetRotationAnimation(10);
        // this.planet.animations.push(planetAnimation);
        // scene.beginAnimation(this.planet, 0, planetAnimation.frameRate, true, 0.005);

        new OrbitGui(scene, async () => {
            await this.gameManager.goTo({ type: 'travel' });
        });

        new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
        skyboxes.purpleSpace({ scene });
    };
}
