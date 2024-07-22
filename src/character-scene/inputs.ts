import * as BABYLON from '@babylonjs/core';

export class CharacterController {
    public readonly camera: BABYLON.ArcRotateCamera;

    constructor(props: { scene: BABYLON.Scene }) {
        const { scene } = props;
        this.camera = new BABYLON.ArcRotateCamera('fps-camera', 2.2, 1.5, 10, new BABYLON.Vector3(0, 1, 0), scene);
        scene.activeCamera = this.camera;
        ''.toLowerCase();
    }
}
