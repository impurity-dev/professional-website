import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Control } from '@babylonjs/gui';
import createButton from './button';

export default class StartGui {
    constructor(readonly scene: Scene, readonly onLaunch: () => void) {
        const gui = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        gui.idealHeight = 720;

        const startBtn = createButton('launch', 'LAUNCH');
        startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        startBtn.top = '-14px';
        startBtn.onPointerDownObservable.add(onLaunch);
        gui.addControl(startBtn);
    }
}
