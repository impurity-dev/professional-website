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
} from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import State from '../game-managers/state';
import SpaceSkybox from '../skyboxes/space-skybox';
import { attachInspector } from '../utils';
import TravelState from './travel-state';

export default class StartState extends State {
    private spaceship: TransformNode;
    private camera: ArcRotateCamera;
    private lightSource: HemisphericLight;
    private skybox: SpaceSkybox;
    private assetsManager: AssetsManager;

    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        this.assetsManager = new AssetsManager(this.scene);
        this.camera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
        this.scene.activeCamera = this.camera;

        this.spaceship = this.createSpaceship();
        this.camera.setTarget(this.spaceship.position);

        const frameRate = 10;
        const xSlide = new Animation(
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
        xSlide.setKeys(keyFrames);
        this.camera.animations.push(xSlide);
        this.scene.beginAnimation(this.camera, 0, 5 * frameRate, true, 0.1);

        this.lightSource = new HemisphericLight('LightSource', new Vector3(1, 1, 0), this.scene);
        this.skybox = new SpaceSkybox(this.scene);

        this.createUI();

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
        attachInspector(this.scene);
    }

    goToTravel(): void {
        this.gameManager.setState(new TravelState(this.gameManager));
        this.scene.detachControl();
        this.scene.dispose();
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

    private createSpaceship(): TransformNode {
        const spaceship: TransformNode = new TransformNode('Spaceship');
        const scale: number = 0.1;
        spaceship.scaling = new Vector3(scale, scale, scale);
        spaceship.position = new Vector3(0, -25, -100);
        spaceship.rotate(new Vector3(0, 1, 0), Math.PI);
        spaceship.rotate(new Vector3(1, 0, 0), -Math.PI / 12);

        const spaceshipMeshTask = this.assetsManager.addMeshTask('SpaceShipTask', '', '/assets/', 'spaceship.obj');
        spaceshipMeshTask.onSuccess = (res) => this.onSpaceShipSuccess(res, spaceship);
        spaceshipMeshTask.onError = this.onSpaceShipError;
        this.assetsManager.load();

        return spaceship;
    }

    private onSpaceShipError(task: MeshAssetTask, message: string, exception?: any): void {
        console.error(`Could not load spaceship with error: ${message}`);
        throw new Error('Error loading spaceship assets');
    }

    private onSpaceShipSuccess(task: MeshAssetTask, parent: Node): void {
        const meshes: AbstractMesh[] = task.loadedMeshes;
        meshes.forEach((mesh) => (mesh.parent = parent));
        const mat1 = new StandardMaterial('Blue', this.scene);
        mat1.diffuseColor = new Color3(0.2, 0.2, 0.5);
        mat1.specularColor = new Color3(0.5, 0.6, 0.87);
        // mat1.emissiveColor = new Color3(0.8, 0, 0.5);
        mat1.ambientColor = new Color3(0.2, 0.2, 0.5);
        meshes[0].material = mat1;
        const mat2 = new StandardMaterial('Yellow', this.scene);
        mat2.diffuseColor = new Color3(0.5, 0.5, 0.1);
        mat2.specularColor = new Color3(0.5, 0.6, 0.1);
        // mat1.emissiveColor = new Color3(0, 0.5, 0.5);
        mat2.ambientColor = new Color3(0.5, 0.5, 0.1);
        meshes[1].material = mat2;
    }
}
