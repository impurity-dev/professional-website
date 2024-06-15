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
        this.camera.speed = 0.5;
        this.camera.angularSensibility = 4000;
        this.camera.keysUp.push(87);
        this.camera.keysLeft.push(65);
        this.camera.keysDown.push(83);
        this.camera.keysRight.push(68);
        this.scene.activeCamera = this.camera;

        const framesPerSecond = 60;
        const gravity = -9.81;
        scene.gravity = new BABYLON.Vector3(0, gravity / framesPerSecond, 0);
        scene.collisionsEnabled = true;
        scene.onPointerDown = (event) => {
            const engine = scene.getEngine() as BABYLON.Engine;
            if (event.button === 0) engine.enterPointerlock();
            if (event.button === 1) engine.exitPointerlock();
        };

        // const light = new BABYLON.SpotLight('spotLight', this.camera.position, this.camera.target, Math.PI / 2, 10, scene);
        // light.diffuse = new BABYLON.Color3(1, 1, 1);
        // light.specular = new BABYLON.Color3(1, 1, 1);
        // light.intensity = 100;
        // scene.onBeforeRenderObservable.add(() => {
        //     light.position = this.camera.position;
        //     light.setDirectionToTarget(this.camera.getFrontPosition(1));
        // });
    }
}
