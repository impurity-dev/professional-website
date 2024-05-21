import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import { createButton } from './components/button.js';

export type OnStart = () => void;
export type MenuGuiProps = {
    onStart: OnStart;
};

export class MenuGui {
    private readonly gui: AdvancedDynamicTexture;
    private readonly start: Button;

    constructor(
        private readonly scene: Scene,
        private readonly props: MenuGuiProps,
    ) {
        this.gui = this.createGui();
        this.start = this.createStart(props.onStart);
    }

    private createGui = () => {
        const ui = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        ui.idealHeight = 720;
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
