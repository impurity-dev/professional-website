import { ArcRotateCamera, Color4, HemisphericLight, Scene, Vector3 } from '@babylonjs/core';
import PlanetEntity from '../entities/planet-entity';
import SpaceShipEntity from '../entities/spaceship-entity';
import OrbitGui from '../guis/orbit-gui';
import SpaceSkybox from '../skyboxes/space-skybox';
import State from './state';
import TravelState from './travel-state';

export default class Orbit extends State {
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
        const planet = new PlanetEntity(this.scene, planetDiameter);
        planet.position = this.spaceship.position.add(new Vector3(-(planetDiameter / 2 + 100), -50, -100));

        let angle = 0;
        this.scene.registerBeforeRender(function () {
            planet.rotation.y = angle;
            angle += 0.00025;
        });

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
