import { ArcRotateCamera, Color4, HemisphericLight, Scene, Vector3, Animatable } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import CameraRotationAnimation from '../animations/camera-rotation-animation';
import ShipRockingAnimation from '../animations/ship-rocking-animation';
import SpaceShipEntity from '../entities/spaceship-entity';
import GasCloudParticles from '../particles/gas-cloud-particles';
import SpaceSkybox from '../skyboxes/space-skybox';
import State from './state';
import TravelState from './travel-state';

export default class StartState extends State {
    private spaceship: SpaceShipEntity;
    private camera: ArcRotateCamera;
    private lightSource: HemisphericLight;
    private skybox: SpaceSkybox;
    private cameraRotationAnimatable: Animatable;

    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        this.spaceship = new SpaceShipEntity(this.scene);
        this.camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
        this.camera.setTarget(this.spaceship.position);
        this.scene.activeCamera = this.camera;

        const cameraAnimation = new CameraRotationAnimation(10);
        const shipAnimation = new ShipRockingAnimation(10);
        this.camera.animations.push(cameraAnimation);
        this.spaceship.animations.push(shipAnimation);
        this.cameraRotationAnimatable = this.scene.beginAnimation(this.camera, 0, 5 * cameraAnimation.frameRate, true, 0.1);
        this.scene.beginAnimation(this.spaceship, 0, 2 * shipAnimation.frameRate, true);

        this.lightSource = new HemisphericLight('LightSource', new Vector3(1, 1, 0), this.scene);
        this.skybox = new SpaceSkybox(this.scene);

        this.createUI();
        const gasClouds = new GasCloudParticles(this.scene);
        gasClouds.fountain.position = this.spaceship.position.add(new Vector3(0, -25, 250));
        gasClouds.start();

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
    }

    goToTravel(): void {
        this.cameraRotationAnimatable.stop();
        this.gameManager.state = new TravelState(this.gameManager);
        this.scene.detachControl();
        this.scene.dispose();
    }

    private createUI(): void {
        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        guiMenu.idealHeight = 720;
        const startBtn = Button.CreateSimpleButton('launch', 'LAUNCH');
        startBtn.width = 0.2;
        startBtn.height = '40px';
        startBtn.color = 'white';
        startBtn.top = '-14px';
        startBtn.thickness = 0;
        startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        guiMenu.addControl(startBtn);
        startBtn.onPointerDownObservable.add(() => this.goToTravel());
    }
}
