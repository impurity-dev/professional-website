import { ArcRotateCamera, Color4, HemisphericLight, Scene, Vector3 } from '@babylonjs/core';
import SpaceShipEntity from '../entities/spaceship-entity';
import TravelGui from '../guis/travel-gui';
import WarpSpeedParticles from '../particles/warpspeed-particles';
import SpaceSkybox from '../skyboxes/space-skybox';
import OrbitState from './orbit-state';
import StartState from './start-state';
import State from './state';

export default class TravelState extends State {
    private spaceship: SpaceShipEntity;
    private camera: ArcRotateCamera;

    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        this.spaceship = new SpaceShipEntity(this.scene);
        this.camera = new ArcRotateCamera('ArcRotateCamera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
        this.scene.activeCamera = this.camera;

        new TravelGui(
            this.scene,
            () => {
                this.goToOrbit();
            },
            () => {
                this.goToStart();
            },
        );

        new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene);
        new SpaceSkybox(this.scene);

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
    }

    async goToStart(): Promise<void> {
        await this.gameManager.setState(new StartState(this.gameManager));
        this.dispose();
    }

    async goToOrbit(): Promise<void> {
        await this.gameManager.setState(new OrbitState(this.gameManager));
        this.dispose();
    }
}
