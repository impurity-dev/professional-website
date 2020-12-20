import {
    Animation,
    ArcRotateCamera,
    AssetsManager,
    Color4,
    HemisphericLight,
    MeshAssetTask,
    Scene,
    Vector3,
    StandardMaterial,
    Color3,
    AbstractMesh,
    Node,
    TransformNode,
    ParticleSystem,
    Texture,
    MeshBuilder,
    BackEase,
    BezierCurveEase,
    CubicEase,
    SineEase,
    EasingFunction,
} from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import State from './state';
import SpaceSkybox from '../skyboxes/space-skybox';
import TravelState from './travel-state';
import SpaceShip from '../entities/spaceship';

export default class StartState extends State {
    private spaceship: SpaceShip;
    private camera: ArcRotateCamera;
    private lightSource: HemisphericLight;
    private skybox: SpaceSkybox;

    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        this.spaceship = new SpaceShip(this.scene);
        this.camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
        this.camera.setTarget(this.spaceship.spaceship.position);
        this.scene.activeCamera = this.camera;

        const cameraFrameRate = 10;
        const shipFrameRate = 10;
        const cameraAnimation = this.createCameraRotationAnimation(cameraFrameRate);
        const shipAnimation = this.createShipRotationAnimation(shipFrameRate);
        this.camera.animations.push(cameraAnimation);
        this.spaceship.spaceship.animations.push(shipAnimation);
        this.scene.beginAnimation(this.camera, 0, 5 * cameraFrameRate, true, 0.1);
        this.scene.beginAnimation(this.spaceship.spaceship, 0, 2 * shipFrameRate, true);

        this.lightSource = new HemisphericLight('LightSource', new Vector3(1, 1, 0), this.scene);
        this.skybox = new SpaceSkybox(this.scene);

        this.createUI();

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
    }

    goToTravel(): void {
        this.gameManager.state = new TravelState(this.gameManager);
        this.scene.detachControl();
        this.scene.dispose();
    }

    private createCameraRotationAnimation(frameRate: number): Animation {
        const cameraAnimation = new Animation(
            'CameraRotation',
            'alpha',
            frameRate,
            Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_RELATIVE,
        );
        const keyFrames = [];
        keyFrames.push({ frame: 0, value: 0 });
        keyFrames.push({ frame: frameRate, value: 2 });
        keyFrames.push({ frame: frameRate * 2, value: 4 });
        keyFrames.push({ frame: frameRate * 3, value: 6 });
        keyFrames.push({ frame: frameRate * 4, value: 8 });
        keyFrames.push({ frame: frameRate * 5, value: 10 });
        cameraAnimation.setKeys(keyFrames);
        return cameraAnimation;
    }

    private createShipRotationAnimation(frameRate: number): Animation {
        const shipAnimation = new Animation(
            'ShipAnimation',
            'rotation',
            frameRate,
            Animation.ANIMATIONTYPE_VECTOR3,
            Animation.ANIMATIONLOOPMODE_CYCLE,
        );
        const easeFunction = new BackEase();
        easeFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
        shipAnimation.setEasingFunction(easeFunction);
        const keyFrames = [];
        const alpha = Math.PI;
        const xAmp = Math.tan(alpha) / 20;
        const yAmp = Math.sin(alpha) / 20;
        const zAmp = Math.cos(alpha / 4) / 20;
        keyFrames.push({ frame: 0, value: new Vector3(xAmp, yAmp, zAmp) });
        keyFrames.push({ frame: frameRate, value: new Vector3(-xAmp, -yAmp, -zAmp) });
        keyFrames.push({ frame: frameRate * 2, value: new Vector3(xAmp, yAmp, zAmp) });
        shipAnimation.setKeys(keyFrames);
        return shipAnimation;
    }

    private createUI(): void {
        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        guiMenu.idealHeight = 720;
        const startBtn = Button.CreateSimpleButton('start', 'PLAY');
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
