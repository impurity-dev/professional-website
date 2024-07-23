import * as BABYLON from '@babylonjs/core';

export const arcCameraRotation = (frameRate: number) => {
    const animation = new BABYLON.Animation(
        'arc-camera-rotation',
        'alpha',
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,
    );
    const keyFrames = [];
    keyFrames.push({ frame: 0, value: 0 });
    keyFrames.push({ frame: frameRate, value: Math.PI / 2 });
    keyFrames.push({ frame: frameRate * 2, value: Math.PI });
    keyFrames.push({ frame: frameRate * 3, value: Math.PI + Math.PI / 2 });
    keyFrames.push({ frame: frameRate * 4, value: 2 * Math.PI });
    animation.setKeys(keyFrames);
    return animation;
};
