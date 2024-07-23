import { Scene, TransformNode } from '@babylonjs/core';
import { AdvancedDynamicTexture, Control, DisplayGrid, StackPanel } from '@babylonjs/gui';
import { createButton } from './components/button.js';

export class TravelGui {
    private gui: AdvancedDynamicTexture;

    constructor(
        readonly scene: Scene,
        readonly anchor: TransformNode,
        readonly onOrbit: () => void,
        readonly onWarp: () => void,
        readonly onStart: () => void,
    ) {
        this.gui = AdvancedDynamicTexture.CreateFullscreenUI('UI');

        const panel = new StackPanel('Button Stack Panel');
        panel.isVertical = false;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.gui.addControl(panel);

        const mapBtn = createButton('map', 'MAP');
        const displayGrid = new DisplayGrid();
        displayGrid.width = '500px';
        displayGrid.height = '500px';
        let mapIsOpen = false;
        mapBtn.onPointerDownObservable.add(() => {
            mapIsOpen = !mapIsOpen;
            if (mapIsOpen) {
                this.gui.addControl(displayGrid);
            } else {
                this.gui.removeControl(displayGrid);
            }
        });
        mapBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        mapBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        mapBtn.paddingRight = '5px';
        mapBtn.paddingLeft = '5px';
        mapBtn.top = '-14px';
        this.gui.addControl(mapBtn);

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
