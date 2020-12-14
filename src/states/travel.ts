import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import { Color4, Scene, Vector3, FreeCamera, HemisphericLight, MeshBuilder, Mesh } from '@babylonjs/core';
import State from '../game/state';
import Orbit from './orbit';
import Start from './start';
import { attachInspector } from '../utils';

export default class Travel extends State {
    async run(): Promise<void> {
        const engine = this.gameManager.getEngine();
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.detachControl();
        this.scene.clearColor = new Color4(0.01568627450980392, 0.01568627450980392, 0.20392156862745098);
        const camera = new FreeCamera('camera1', new Vector3(0, 0, 0), this.scene);
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
        loseBtn.onPointerDownObservable.add(() => {
            this.goToOrbit();
            this.scene.detachControl();
            this.scene.dispose();
        });
        const light1: HemisphericLight = new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene);
        const sphere: Mesh = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, this.scene);

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
        this.scene.attachControl();
        attachInspector(this.scene);
    }

    goToStart(): void {
        this.gameManager.setState(new Start(this.gameManager));
    }

    goToOrbit(): void {
        this.gameManager.setState(new Orbit(this.gameManager));
    }
}
