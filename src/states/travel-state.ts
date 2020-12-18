import { ArcRotateCamera, Color4, HemisphericLight, Mesh, MeshBuilder, Scene, Space, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import State from './state';
import SpaceSkybox from '../skyboxes/space-skybox';
import { attachInspector } from '../utils';
import OrbitState from './orbit-state';
import StartState from './start-state';

export default class TravelState extends State {
    async run(): Promise<void> {
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.detachControl();
        this.scene.clearColor = new Color4(0, 1, 0, 0);
        const camera: ArcRotateCamera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), this.scene);
        camera.setTarget(Vector3.Zero());

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
        const light1: HemisphericLight = new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene);
        const sphere: Mesh = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, this.scene);
        const skybox: SpaceSkybox = new SpaceSkybox(this.scene);

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
        this.scene.attachControl();
        attachInspector(this.scene);
    }

    goToStart(): void {
        this.gameManager.state = new StartState(this.gameManager);
        this.scene.detachControl();
        this.scene.dispose();
    }

    goToOrbit(): void {
        this.gameManager.state = new OrbitState(this.gameManager);
        this.scene.detachControl();
        this.scene.dispose();
    }
}
