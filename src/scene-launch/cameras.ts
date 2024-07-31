import * as BABYLON from '@babylonjs/core';

export const playerCamera = (props: { scene: BABYLON.Scene; location: BABYLON.Vector3; target: BABYLON.Vector3; parent: BABYLON.TransformNode }) => {
    const { scene, location, target, parent } = props;
    const camera = new BABYLON.UniversalCamera('fps-camera', location, scene);
    camera.parent = parent;
    camera.target = target;
    camera.minZ = 0.45;
    scene.activeCamera = camera;
    return { playerCamera: camera };
};
