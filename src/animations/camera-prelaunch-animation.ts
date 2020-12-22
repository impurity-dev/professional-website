import { Animation } from '@babylonjs/core';

export default class CameraPrelaunchAnimation extends Animation {
    constructor(public startValue: number, public readonly frameRate: number) {
        super('CameraPrelaunchAnimation', 'alpha', frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
        const keyFrames = [];
        keyFrames.push({ frame: 0, value: startValue });
        keyFrames.push({ frame: frameRate, value: 4.8 });
        this.setKeys(keyFrames);
    }
}
