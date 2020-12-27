import { Animation, CubicEase, EasingFunction, Vector3 } from '@babylonjs/core';

export default class ShipTravelOscillationAnimation extends Animation {
    constructor(public readonly frameRate: number) {
        super('ShipTravelOscillationAnimation', 'position', frameRate, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
        const easeFunction = new CubicEase();
        easeFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
        this.setEasingFunction(easeFunction);
        let alpha = 0;
        const keyFrames = [];
        for (let i = 0; i < frameRate; i++) {
            const x = 5 * Math.cos(alpha);
            const y = 0;
            const z = 0;
            keyFrames.push({ frame: i, value: new Vector3(x, y, z) });
            alpha += 0.1;
        }
        this.setKeys(keyFrames);
    }
}
