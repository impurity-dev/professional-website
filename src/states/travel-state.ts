import { ArcRotateCamera, Color4, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import SpaceSkybox from '../skyboxes/space-skybox';
import OrbitState from './orbit-state';
import StartState from './start-state';
import State from './state';

export default class TravelState extends State {
    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();

        this.scene = new Scene(engine);
        this.scene.detachControl();
        this.scene.clearColor = new Color4(0, 1, 0, 0);
        const camera: ArcRotateCamera = new ArcRotateCamera('Camera2', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
        camera.setTarget(Vector3.Zero());
        this.scene.activeCamera = camera;

        const playerUI = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const loseBtn = Button.CreateSimpleButton('lose', 'LOSE');
        loseBtn.width = 0.2;
        loseBtn.height = '40px';
        loseBtn.color = 'white';
        loseBtn.top = '-14px';
        loseBtn.thickness = 0;
        loseBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        playerUI.addControl(loseBtn);
        loseBtn.onPointerDownObservable.add(() => this.goToOrbit());
        new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene);
        MeshBuilder.CreateSphere('sphere', { diameter: 1 }, this.scene);
        new SpaceSkybox(this.scene);

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
        this.scene.attachControl();
    }

    goToStart(): void {
        this.gameManager.setState( new StartState(this.gameManager));
        this.scene.detachControl();
        this.scene.dispose();
    }

    goToOrbit(): void {
        this.gameManager.setState(new OrbitState(this.gameManager));
        this.scene.detachControl();
        this.scene.dispose();
    }
}
