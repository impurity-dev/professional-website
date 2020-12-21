import { Animation } from '@babylonjs/core';

export default class CameraRotationAnimation extends Animation {
    constructor(public readonly frameRate: number) {
        super('CameraRotationAnimation', 'alpha', frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_RELATIVE);
        const keyFrames = [];
        keyFrames.push({ frame: 0, value: 0 });
        keyFrames.push({ frame: frameRate, value: 2 });
        keyFrames.push({ frame: frameRate * 2, value: 4 });
        keyFrames.push({ frame: frameRate * 3, value: 6 });
        keyFrames.push({ frame: frameRate * 4, value: 8 });
        keyFrames.push({ frame: frameRate * 5, value: 10 });
        this.setKeys(keyFrames);
    }
}
