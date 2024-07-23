import * as BABYLON from '@babylonjs/core';

export class CharacterController {
    public readonly camera: BABYLON.ArcRotateCamera;

    constructor(props: { scene: BABYLON.Scene; target: BABYLON.Vector3 }) {
        const { scene, target } = props;
        this.camera = new BABYLON.ArcRotateCamera('fps-camera', 2.2, 1.2, 5, target, scene);
        scene.activeCamera = this.camera;
    }
}
