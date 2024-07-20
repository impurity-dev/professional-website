import * as BABYLON from '@babylonjs/core';
import * as animations from './animations';
import * as events from './events.js';

export class CreditsController {
    public readonly camera: BABYLON.ArcRotateCamera;

    constructor(props: { scene: BABYLON.Scene; target: BABYLON.Vector3; event: events.Events }) {
        const { scene, target, event } = props;
        this.camera = new BABYLON.ArcRotateCamera('arc-camera', Math.PI / 2, Math.PI / 2.5, 27, target, scene);
        scene.activeCamera = this.camera;
        const frameRate = 5;
        this.camera.animations = [animations.arcCameraRotation(frameRate)];
        scene.beginAnimation(this.camera, 0, 4 * frameRate, true, 0.5);
    }
}
