import * as BABYLON from '@babylonjs/core';

export class FirstPersonController {
    readonly camera: BABYLON.UniversalCamera;

    constructor(
        private readonly scene: BABYLON.Scene,
        location: BABYLON.Vector3,
        target: BABYLON.Vector3,
    ) {
        this.camera = new BABYLON.UniversalCamera('fps-camera', location, this.scene);
        this.scene.activeCamera = this.camera;
        this.camera.target = target;
        this.camera.attachControl();
        this.camera.applyGravity = true;
        this.camera.checkCollisions = true;
        this.camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        this.camera.minZ = 0.45;
        this.camera.speed = 0.75;
        this.camera.angularSensibility = 4000;
        this.camera.keysUp.push(87);
        this.camera.keysLeft.push(65);
        this.camera.keysDown.push(83);
        this.camera.keysRight.push(68);
        this.scene.activeCamera = this.camera;
    }
}
