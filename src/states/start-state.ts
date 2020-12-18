import {
    AbstractMesh,
    ArcRotateCamera,
    AssetsManager,
    Color4,
    HemisphericLight,
    Mesh,
    MeshAssetTask,
    MeshBuilder,
    Scene,
    Vector3,
} from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import State from '../game-managers/state';
import SpaceSkybox from '../skyboxes/space-skybox';
import { attachInspector } from '../utils';
import TravelState from './travel-state';

export default class StartState extends State {
    async run(): Promise<void> {
        const engine = this.gameManager.getEngine();
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.detachControl();
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        const assetsManager = new AssetsManager(this.scene);

        const spaceshipMeshTask = assetsManager.addMeshTask('SpaceShip Task', '', '/assets/', 'spaceship.stl');
        spaceshipMeshTask.onSuccess = this.onSpaceShipSuccess;
        spaceshipMeshTask.onError = this.onSpaceShipError;
        assetsManager.load();

        const light1: HemisphericLight = new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene);
        const skybox: SpaceSkybox = new SpaceSkybox(this.scene);

        const camera: ArcRotateCamera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
        camera.setTarget(Vector3.Zero());

        this.createUI();

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
        this.scene.attachControl();
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

    private onSpaceShipError(task: MeshAssetTask, message: string, exception?: any): void {
        console.error(`Could not load spaceship with error: ${message}`);
        throw new Error('Error loading spaceship assets');
    }

    private onSpaceShipSuccess(task: MeshAssetTask): void {
        const mesh: AbstractMesh = task.loadedMeshes[0];
        mesh.position = new Vector3(0, -30, -100);
        const scale = 0.1;
        mesh.scaling = new Vector3(scale, scale, scale);
    }
}
