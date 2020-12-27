import { Animation, CubicEase, EasingFunction } from '@babylonjs/core';

export default class ShipTravelRotationAnimation extends Animation {
    constructor(public readonly frameRate: number) {
        super('ShipTravelRotationAnimation', 'rotation.z', frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
        const easeFunction = new CubicEase();
        easeFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
        this.setEasingFunction(easeFunction);
        let alpha = 0;
        const keyFrames = [];
        for (let i = 0; i < frameRate; i++) {
            keyFrames.push({ frame: i, value: Math.cos(alpha) * 0.3 });
            alpha += 0.1;
        }
        this.setKeys(keyFrames);
    }
}
