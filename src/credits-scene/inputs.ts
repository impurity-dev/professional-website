import * as BABYLON from '@babylonjs/core';
import { take, tap } from 'rxjs';
import * as animations from './animations';
import * as events from './events.js';

export class CreditsController {
    public readonly camera: BABYLON.ArcRotateCamera;
    private readonly deviceManager: BABYLON.DeviceSourceManager;

    constructor(props: { scene: BABYLON.Scene; target: BABYLON.Vector3; event: events.Events }) {
        const { scene, target, event } = props;
        this.deviceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        this.camera = new BABYLON.ArcRotateCamera('arc-camera', Math.PI / 2, Math.PI / 2.5, 27, target, scene);
        scene.activeCamera = this.camera;
        const frameRate = 5;
        this.camera.animations = [animations.arcCameraRotation(frameRate)];
        scene.beginAnimation(this.camera, 0, 4 * frameRate, true, 0.5);
        this.deviceManager.onDeviceConnectedObservable.add((device) => {
            if (device.deviceType !== BABYLON.DeviceType.Keyboard) return;
            this.handleKeyboard({ keyboard: device, event });
        });
    }

    handleKeyboard = (props: { keyboard: BABYLON.DeviceSource<BABYLON.DeviceType.Keyboard>; event: events.Events }) => {
        const { keyboard, event } = props;
        const A = 65;
        const D = 68;
        let currentKey: string | undefined;
        keyboard.onInputChangedObservable.add((keyEvent) => {
            if (keyboard.getInput(A) === 1 && keyEvent.type == 'keydown' && !currentKey) {
                currentKey = keyEvent.code;
                event.current$
                    .pipe(
                        take(1),
                        tap((current) => event.goTo$.next({ index: current.index - 1 })),
                    )
                    .subscribe();
            }
            if (keyboard.getInput(D) === 1 && keyEvent.type == 'keydown' && !currentKey) {
                currentKey = keyEvent.code;
                event.current$
                    .pipe(
                        take(1),
                        tap((current) => event.goTo$.next({ index: current.index + 1 })),
                    )
                    .subscribe();
            }
            if (keyEvent.type == 'keyup' && currentKey == keyEvent.code) currentKey = undefined;
        });
    };
}
