import { Animation, BackEase, EasingFunction, Vector3 } from '@babylonjs/core';

export default class ShipRockingAnimation extends Animation {
    constructor(public readonly frameRate: number) {
        super('ShipRockingAnimation', 'rotation', frameRate, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
        const easeFunction = new BackEase();
        easeFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
        this.setEasingFunction(easeFunction);
        const keyFrames = [];
        const alpha = Math.PI;
        const xAmp = Math.tan(alpha) / 20;
        const yAmp = Math.sin(alpha) / 20;
        const zAmp = Math.cos(alpha / 4) / 20;
        keyFrames.push({ frame: 0, value: new Vector3(xAmp, yAmp, zAmp) });
        keyFrames.push({ frame: frameRate, value: new Vector3(-xAmp, -yAmp, -zAmp) });
        keyFrames.push({ frame: frameRate * 2, value: new Vector3(xAmp, yAmp, zAmp) });
        this.setKeys(keyFrames);
    }
}
