import * as BABYLON from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import { createButton } from './components/button.js';

export type OnStart = () => void;
export type MenuGuiProps = {
    onStart: OnStart;
};

export class MenuGui {
    private readonly gui: AdvancedDynamicTexture;
    private readonly start: Button;
    private readonly mask = 0x10000000;

    constructor(
        private readonly scene: BABYLON.Scene,
        private readonly props: MenuGuiProps,
    ) {
        this.gui = this.createGui();
        this.start = this.createStart(props.onStart);
        this.scene.activeCameras.push(this.createCamera());
    }

    private createCamera = () => {
        const bgCamera = new BABYLON.ArcRotateCamera('BGCamera', Math.PI / 2 + Math.PI / 7, Math.PI / 2, 100, new BABYLON.Vector3(0, 20, 0), this.scene);
        bgCamera.layerMask = this.mask;
        return bgCamera;
    };

    private createGui = () => {
        const ui = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        ui.idealHeight = 720;
        ui.layer.layerMask = this.mask;
        return ui;
    };

    private createStart = (onStart: OnStart): Button => {
        const button = createButton('launch', 'LAUNCH');
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        button.top = '-14px';
        button.onPointerDownObservable.add(onStart);
        this.gui.addControl(button);
        return button;
    };
}
