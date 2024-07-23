import { Animation } from '@babylonjs/core';

export class CameraRotationAnimation extends Animation {
    constructor(public readonly frameRate: number) {
        super('CameraRotationAnimation', 'alpha', frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
        const keyFrames = [];
        keyFrames.push({ frame: 0, value: 0 });
        keyFrames.push({ frame: frameRate, value: Math.PI / 2 });
        keyFrames.push({ frame: frameRate * 2, value: Math.PI });
        keyFrames.push({ frame: frameRate * 3, value: Math.PI + Math.PI / 2 });
        keyFrames.push({ frame: frameRate * 4, value: 2 * Math.PI });
        this.setKeys(keyFrames);
    }
}
