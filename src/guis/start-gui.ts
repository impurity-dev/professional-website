import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';

export default class StartGui {
    constructor(private readonly scene: Scene, readonly onLaunch: () => void) {
        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        guiMenu.idealHeight = 720;
        const startBtn = Button.CreateSimpleButton('launch', 'LAUNCH');
        startBtn.width = 0.2;
        startBtn.height = '40px';
        startBtn.color = 'white';
        startBtn.top = '-14px';
        startBtn.thickness = 5;
        startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        guiMenu.addControl(startBtn);
        startBtn.onPointerDownObservable.add(onLaunch);
    }
}
