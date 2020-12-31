import { ArcRotateCamera, Color4, HemisphericLight, Scene, Vector3 } from '@babylonjs/core';
import PlanetRotationAnimation from '../animations/planet-rotation-animation';
import ShipRockingAnimation from '../animations/ship-rocking-animation';
import PlanetEntity from '../entities/planet-entity';
import SpaceShipEntity from '../entities/spaceship-entity';
import OrbitGui from '../guis/orbit-gui';
import SpaceSkybox from '../skyboxes/space-skybox';
import State from './state';
import TravelState from './travel-state';

export default class Orbit extends State {
    private planet: PlanetEntity;
    private spaceship: SpaceShipEntity;
    private camera: ArcRotateCamera;

    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        this.spaceship = new SpaceShipEntity(this.scene);
        this.spaceship.position = Vector3.Zero();
        this.camera = new ArcRotateCamera(
            'ArcFollowCamera',
            0,
            Math.PI / 2.5,
            100,
            this.spaceship.position.add(new Vector3(0, 15, 50)),
            this.scene,
        );
        this.scene.activeCamera = this.camera;

        const planetDiameter = 1000;
        this.planet = new PlanetEntity(this.scene, planetDiameter);
        this.planet.position = this.spaceship.position.add(new Vector3(-(planetDiameter / 2 + 100), -50, -100));

        const shipAnimation = new ShipRockingAnimation(10);
        this.spaceship.animations.push(shipAnimation);
        this.scene.beginAnimation(this.spaceship, 0, 2 * shipAnimation.frameRate, true);

        const planetAnimation = new PlanetRotationAnimation(10);
        this.planet.animations.push(planetAnimation);
        this.scene.beginAnimation(this.planet, 0, planetAnimation.frameRate, true, 0.005);

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
    }
}
