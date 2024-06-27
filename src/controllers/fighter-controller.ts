import * as BABYLON from '@babylonjs/core';
import { Model } from '../entities/model';

export class FighterController {
    public readonly onActionPressed: BABYLON.Observable<void> = new BABYLON.Observable();
    public readonly camera: BABYLON.FreeCamera;
    private readonly deviceManager: BABYLON.DeviceSourceManager;

    constructor(
        private readonly scene: BABYLON.Scene,
        parent: Model,
    ) {
        this.deviceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        this.camera = new BABYLON.FreeCamera('fighter-camera', parent.transform.position.add(new BABYLON.Vector3(0, 20, -40)), scene);
        this.scene.activeCamera = this.camera;
        this.camera.parent = parent.transform;
        this.camera.target = parent.transform.position.add(new BABYLON.Vector3(0, 0, 100));
        this.camera.attachControl();
        this.scene.activeCamera = this.camera;
        scene.collisionsEnabled = true;
        scene.onPointerDown = (event) => {
            const engine = scene.getEngine() as BABYLON.Engine;
            if (event.button === 0) engine.enterPointerlock();
            if (event.button === 1) engine.exitPointerlock();
        };

        const box = BABYLON.MeshBuilder.CreateBox('camera-box', { size: 10 }, scene);
        box.parent = this.camera;

        // Define some references for the chase cam; these are in-scene objects
        // that will be set later, when the spaceship mesh is loaded
        const chaseCameraPosition = null; // The position we want to place the camera
        const chaseCameraLookAt = null; // The position we want the camera to look at

        // Use the onBeforeRenderObservable event to move the
        // camera into position and face the correct way
        scene.onBeforeRenderObservable.add(() => {
            if (chaseCameraPosition) {
                // Smoothly interpolate the camera's current position
                // towards the calculated camera position
                this.camera.position = BABYLON.Vector3.Lerp(this.camera.position, chaseCameraPosition.getAbsolutePosition(), (scene.deltaTime / 1000) * 3);
                // Note: you can tweak the 3 above to get a snappier
                // or sloppier camera-follow

                // We always want to align the camera's "up" with the spaceship's "up."
                // This gives us a nice fully-3d space feel and prevents "gimbal lock"
                this.camera.upVector = chaseCameraPosition.up;
            }

            // Turn the camera to always face the look-at position
            if (chaseCameraLookAt) {
                this.camera.target = chaseCameraLookAt.getAbsolutePosition();
            }
        });
    }

    handleControls = () => {
        const { deviceManager } = this;
        const keyboard = deviceManager.getDeviceSource(BABYLON.DeviceType.Keyboard);
        if (!keyboard) {
            return;
        }
        const E = 69;
        if (keyboard.getInput(E) === 1) {
            this.onActionPressed.notifyObservers();
        }
    };
}
