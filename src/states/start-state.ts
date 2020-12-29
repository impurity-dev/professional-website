import { Animatable, ArcRotateCamera, Color4, HemisphericLight, Scene, Vector3 } from '@babylonjs/core';
import CameraPrelaunchAnimation from '../animations/camera-prelaunch-animation';
import CameraRotationAnimation from '../animations/camera-rotation-animation';
import ShipLaunchAnimation from '../animations/ship-launch-animation';
import ShipRockingAnimation from '../animations/ship-rocking-animation';
import SpaceShipEntity from '../entities/spaceship-entity';
import StartGui from '../guis/start-gui';
import GasCloudParticles from '../particles/gas-cloud-particles';
import SpaceSkybox from '../skyboxes/space-skybox';
import State from './state';
import TravelState from './travel-state';

export default class StartState extends State {
    private spaceship: SpaceShipEntity;
    private camera: ArcRotateCamera;
    private cameraAnimatable: Animatable;
    private shipAnimatable: Animatable;
    private isWarping: boolean = false;

    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        this.spaceship = new SpaceShipEntity(this.scene);
        this.spaceship.position = Vector3.Zero();
        this.camera = new ArcRotateCamera('ArcRotateCamera', Math.PI / 2, Math.PI / 2.5, 100, this.spaceship.position, this.scene);
        this.camera.setTarget(this.spaceship.position);
        this.scene.activeCamera = this.camera;

        const cameraAnimation = new CameraRotationAnimation(10);
        const shipAnimation = new ShipRockingAnimation(10);
        this.camera.animations.push(cameraAnimation);
        this.spaceship.animations.push(shipAnimation);
        this.cameraAnimatable = this.scene.beginAnimation(this.camera, 0, 4 * cameraAnimation.frameRate, true, 0.5);
        this.shipAnimatable = this.scene.beginAnimation(this.spaceship, 0, 2 * shipAnimation.frameRate, true);

        new HemisphericLight('LightSource', new Vector3(1, 1, 0), this.scene);
        new SpaceSkybox(this.scene);

        const gasClouds = new GasCloudParticles(this.scene, 200, new Vector3(0, 0, -1), new Vector3(0, 0, -1));
        gasClouds.emitter = this.spaceship.position.add(new Vector3(0, -25, 250));
        gasClouds.start();

        new StartGui(this.scene, () => {
            if (this.isWarping) return;

            this.isWarping = true;
            // Stop Passive animation
            this.cameraAnimatable.stop();
            this.shipAnimatable.stop();

            // Start Launch
            const cameraAnimation = new CameraPrelaunchAnimation(this.camera.alpha, 10);
            this.camera.animations.push(cameraAnimation);
            this.cameraAnimatable = this.scene.beginAnimation(this.camera, 0, cameraAnimation.frameRate, false, 1, () => {
                gasClouds.stop();

                const shipAnimation = new ShipLaunchAnimation(this.spaceship.position, 10);
                this.spaceship.animations.push(shipAnimation);
                this.scene.beginAnimation(this.spaceship, 0, shipAnimation.frameRate, false, 1, async () => await this.goToTravel());
            });
        });

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
    }

    async goToTravel(): Promise<void> {
        await this.gameManager.setState(new TravelState(this.gameManager));
    }
}
