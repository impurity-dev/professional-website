import * as BABYLON from '@babylonjs/core';

export const mainCamera = (props: { scene: BABYLON.Scene; target: BABYLON.TransformNode }) => {
    const { scene, target } = props;
    const camera = new BABYLON.FreeCamera('camera', target.position, scene);
    scene.activeCamera = camera;
    camera.attachControl();

    const cameraLocation = new BABYLON.TransformNode('camera-position', scene);
    cameraLocation.parent = target;
    cameraLocation.position = new BABYLON.Vector3(0, 10, -30);
    camera.position = cameraLocation.position;
    const cameraLook = new BABYLON.TransformNode('camera-look', scene);
    cameraLook.parent = target;
    cameraLook.position = new BABYLON.Vector3(0, 10, 1);
    camera.target = cameraLook.position;
    scene.onBeforeRenderObservable.add(() => {
        if (cameraLocation) {
            camera.position = BABYLON.Vector3.Lerp(camera.position, cameraLocation.getAbsolutePosition(), (scene.getEngine().getDeltaTime() / 1000) * 3);
            camera.upVector = cameraLocation.up;
        }
        if (cameraLook) {
            camera.target = cameraLook.getAbsolutePosition();
        }
    });
    return { camera };
};
