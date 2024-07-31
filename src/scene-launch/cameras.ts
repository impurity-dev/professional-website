import * as BABYLON from '@babylonjs/core';

export const playerCamera = (props: { scene: BABYLON.Scene; location: BABYLON.Vector3; target: BABYLON.Vector3 }) => {
    const { scene, location, target } = props;
    const camera = new BABYLON.UniversalCamera('fps-camera', location, scene);
    camera.target = target;
    camera.attachControl();
    camera.minZ = 0.45;
    camera.speed = 5;
    camera.angularSensibility = 4000;
    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    scene.activeCamera = camera;
    return camera;
};
