import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control, StackPanel } from '@babylonjs/gui';
import createButton from './button';

export default class TravelGui {
    constructor(private readonly scene: Scene, readonly onOrbit: () => void, readonly onWarp: () => void, readonly onStart: () => void) {
        const gui = AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const panel = new StackPanel();
        panel.isVertical = false;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        gui.addControl(panel);

        const orbitBtn = createButton('orbit', 'ORBIT');
        orbitBtn.onPointerDownObservable.add(onOrbit);
        orbitBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        orbitBtn.paddingRight = '5px';
        orbitBtn.paddingLeft = '5px';
        orbitBtn.top = '-14px';
        panel.addControl(orbitBtn);

        const warpBtn = createButton('warp', 'WARP');
        warpBtn.onPointerDownObservable.add(onWarp);
        warpBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        warpBtn.paddingRight = '5px';
        warpBtn.paddingLeft = '5px';
        warpBtn.top = '-14px';
        panel.addControl(warpBtn);

        const exitBtn = createButton('exit', 'EXIT');
        exitBtn.onPointerDownObservable.add(onStart);
        exitBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        exitBtn.paddingRight = '5px';
        exitBtn.paddingLeft = '5px';
        exitBtn.top = '-14px';
        panel.addControl(exitBtn);
    }
}
