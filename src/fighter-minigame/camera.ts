import * as BABYLON from '@babylonjs/core';
import { Model } from '../entities/model';

export class FighterCamera {
    public readonly camera: BABYLON.FreeCamera;
    public readonly cameraLocation: BABYLON.TransformNode;
    public readonly cameraLook: BABYLON.TransformNode;

    constructor(props: { scene: BABYLON.Scene; target: Model }) {
        const { scene, target } = props;
        this.camera = new BABYLON.FreeCamera('camera', target.transform.position, scene);
        const { camera } = this;
        scene.activeCamera = camera;
        camera.attachControl();

        this.cameraLocation = new BABYLON.TransformNode('camera-position', scene);
        const { cameraLocation } = this;
        cameraLocation.parent = target.transform;
        cameraLocation.position = new BABYLON.Vector3(0, 10, -30);
        camera.position = cameraLocation.position;
        this.cameraLook = new BABYLON.TransformNode('camera-look', scene);
        const { cameraLook } = this;
        cameraLook.parent = target.transform;
        cameraLook.position = new BABYLON.Vector3(0, 10, 1);
        camera.target = cameraLook.position;
        scene.onBeforeRenderObservable.add(() => {
            camera.position = BABYLON.Vector3.Lerp(camera.position, cameraLocation.getAbsolutePosition(), (scene.deltaTime / 1000) * 3);
            camera.upVector = cameraLocation.up;
            camera.target = cameraLook.getAbsolutePosition();
        });
    }
}
