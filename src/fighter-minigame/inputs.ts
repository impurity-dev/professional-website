import * as BABYLON from '@babylonjs/core';

export class FighterController {
    private readonly deviceManager: BABYLON.DeviceSourceManager;

    constructor(props: { scene: BABYLON.Scene }) {
        const { scene } = props;
        this.deviceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        const { deviceManager } = this;
        scene.onPointerDown = (event) => {
            const engine = scene.getEngine() as BABYLON.Engine;
            if (event.button === 0) engine.enterPointerlock();
            if (event.button === 1) engine.exitPointerlock();
        };
        const keyboard = deviceManager.getDeviceSource(BABYLON.DeviceType.Keyboard);
        if (!keyboard) {
            return;
        }
        // TODO: Controls
    }
}
