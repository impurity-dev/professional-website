import * as BABYLON from '@babylonjs/core';

export const controls = (props: { camera: BABYLON.UniversalCamera }) => {
    const { camera } = props;
    cameraControls({ enabled: false, camera });
};

const cameraControls = (props: { enabled: boolean; camera: BABYLON.UniversalCamera }) => {
    const { enabled, camera } = props;
    if (!enabled) return;
    camera.attachControl();
    camera.speed = 5;
    camera.angularSensibility = 4000;
    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
};
