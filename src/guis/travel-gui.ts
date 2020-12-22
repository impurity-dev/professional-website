import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';

export default class TravelGui {
    constructor(private readonly scene: Scene, readonly onOrbit: () => void) {
        const playerUI = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const orbitBtn = Button.CreateSimpleButton('orbit', 'ORBIT');
        orbitBtn.width = 0.2;
        orbitBtn.height = '40px';
        orbitBtn.color = 'white';
        orbitBtn.top = '-14px';
        orbitBtn.thickness = 0;
        orbitBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        playerUI.addControl(orbitBtn);
        orbitBtn.onPointerDownObservable.add(onOrbit);
    }
}
