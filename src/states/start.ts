import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import { Scene, Color4, FreeCamera, Vector3 } from '@babylonjs/core';
import State from '../game/state';
import Travel from './travel';

export default class Start extends State {
    async run(): Promise<void> {
        const engine = this.gameManager.getEngine();
        engine.displayLoadingUI();
        this.scene = new Scene(engine);
        this.scene.detachControl();
        this.scene.clearColor = new Color4(0, 0, 0, 1);
        const camera = new FreeCamera('camera1', new Vector3(0, 0, 0), this.scene);
        camera.setTarget(Vector3.Zero());

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
        startBtn.onPointerDownObservable.add(() => {
            this.goToTravel();
            this.scene.detachControl();
            this.scene.dispose();
        });

        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
        this.scene.attachControl();
    }

    goToTravel(): void {
        this.gameManager.setState(new Travel(this.gameManager));
    }
}
