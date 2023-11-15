import { Scene, UniversalCamera, Vector3 } from '@babylonjs/core';

export class FirstPersonController {
    private readonly camera: UniversalCamera;

    constructor(private readonly scene: Scene) {
        this.camera = new UniversalCamera('camera', new Vector3(0, 2, -10), this.scene);
        this.camera.attachControl();
        this.camera.applyGravity = true;
        this.camera.checkCollisions = true;
        this.camera.ellipsoid = new Vector3(1, 1, 1);
        this.camera.minZ = 0.45;
        this.camera.speed = 0.75;
        this.camera.angularSensibility = 4000;
        this.camera.keysUp.push(87);
        this.camera.keysLeft.push(65);
        this.camera.keysDown.push(83);
        this.camera.keysRight.push(68);
    }
}
