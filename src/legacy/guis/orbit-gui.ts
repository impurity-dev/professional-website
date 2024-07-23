import { Scene } from '@babylonjs/core';
import { AdvancedDynamicTexture, Control } from '@babylonjs/gui';
import { createButton } from './components/button.js';

export class OrbitGui {
    constructor(
        readonly scene: Scene,
        readonly onTravel: () => void,
    ) {
        const gui = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        gui.idealHeight = 720;

        const travelBtn = createButton('launch', 'LAUNCH');
        travelBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        travelBtn.top = '-14px';
        travelBtn.onPointerDownObservable.add(onTravel);
        gui.addControl(travelBtn);
    }
}
