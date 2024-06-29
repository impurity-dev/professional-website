import * as BABYLON from '@babylonjs/core';
import { Model } from '../entities/model';

export class FighterController {
    private readonly deviceManager: BABYLON.DeviceSourceManager;

    constructor(props: { scene: BABYLON.Scene; target: Model }) {
        const { scene, target } = props;
        this.deviceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        scene.onPointerDown = (event) => {
            const engine = scene.getEngine() as BABYLON.Engine;
            if (event.button === 0) engine.enterPointerlock();
            if (event.button === 1) engine.exitPointerlock();
        };

        const W = 87;
        const A = 65;
        const S = 83;
        const D = 68;
        const E = 69;
        const Q = 81;
        target.addOnLoad(() => {
            scene.registerBeforeRender(() => {
                const { deviceManager } = this;
                const keyboard = deviceManager.getDeviceSource(BABYLON.DeviceType.Keyboard);
                if (!keyboard) {
                    return;
                }
                const deltaSeconds = scene.deltaTime / 1000;
                const speed = 100 * deltaSeconds;
                const rotation = 1 * deltaSeconds;
                if (keyboard.getInput(W) === 1) {
                    target.transform.position.addInPlace(new BABYLON.Vector3(0, 0, speed));
                }
                if (keyboard.getInput(S) === 1) {
                    target.transform.position.addInPlace(new BABYLON.Vector3(0, 0, -speed));
                }
                if (keyboard.getInput(D) === 1) {
                    target.transform.rotation.addInPlace(new BABYLON.Vector3(0, rotation, 0));
                }
                if (keyboard.getInput(A) === 1) {
                    target.transform.rotation.addInPlace(new BABYLON.Vector3(0, -rotation, 0));
                }
                if (keyboard.getInput(E) === 1) {
                    target.transform.rotation.addInPlace(new BABYLON.Vector3(0, 0, -rotation));
                }
                if (keyboard.getInput(Q) === 1) {
                    target.transform.rotation.addInPlace(new BABYLON.Vector3(0, 0, rotation));
                }
            });
        });
    }
}
