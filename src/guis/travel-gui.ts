import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';

export default class TravelGui {
    constructor(private readonly scene: Scene, readonly onOrbit: () => void, readonly onWarp: () => void, readonly onStart: () => void) {
        const playerUI = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const orbitBtn = Button.CreateSimpleButton('orbit', 'ORBIT');
        orbitBtn.width = 0.2;
        orbitBtn.height = '40px';
        orbitBtn.color = 'white';
        orbitBtn.top = '-14px';
        orbitBtn.thickness = 0;
        orbitBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        orbitBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        playerUI.addControl(orbitBtn);
        orbitBtn.onPointerDownObservable.add(onOrbit);
        const warpBtn = Button.CreateSimpleButton('warp', 'WARP');
        warpBtn.width = 0.2;
        warpBtn.height = '40px';
        warpBtn.color = 'white';
        warpBtn.top = '-14px';
        warpBtn.thickness = 0;
        warpBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        warpBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        playerUI.addControl(warpBtn);
        warpBtn.onPointerDownObservable.add(onWarp);
        const startBtn = Button.CreateSimpleButton('exit', 'EXIT');
        startBtn.width = 0.2;
        startBtn.height = '40px';
        startBtn.color = 'white';
        startBtn.top = '14px';
        startBtn.thickness = 0;
        startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        startBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        playerUI.addControl(startBtn);
        startBtn.onPointerDownObservable.add(onStart);
    }
}
