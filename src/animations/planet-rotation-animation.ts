import { Animation } from '@babylonjs/core';

export class PlanetRotationAnimation extends Animation {
    constructor(public readonly frameRate: number) {
        super('PlanetRotationAnimation', 'rotation.y', frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
        const keyFrames = [];
        keyFrames.push({ frame: 0, value: 0 });
        keyFrames.push({ frame: frameRate, value: 2 * Math.PI });
        this.setKeys(keyFrames);
    }
}
