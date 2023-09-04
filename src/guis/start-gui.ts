import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
import createButton from './components/button.js';

export type OnLaunch = () => void;
export type StartGuiProps = {
    onLaunch: OnLaunch;
};

export default class StartGui {
    private readonly gui: AdvancedDynamicTexture;
    private readonly startButton: Button;

    constructor(
        readonly scene: Scene,
        readonly props: StartGuiProps,
    ) {
        this.gui = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.gui.idealHeight = 720;

        this.startButton = this.createStartButton(props.onLaunch);

        this.gui.addControl(this.startButton);
    }

    private createStartButton = (onLaunch: OnLaunch): Button => {
        const button = createButton('launch', 'LAUNCH');
        button.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        button.top = '-14px';
        button.onPointerDownObservable.add(onLaunch);
        return button;
    };
}
