import { Animation, EasingFunction, Vector3, BackEase } from '@babylonjs/core';

export class ShipLaunchAnimation extends Animation {
    constructor(
        readonly startingPosition: Vector3,
        public readonly frameRate: number,
    ) {
        super('ShipLaunchAnimation', 'position', frameRate, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        const easeFunction = new BackEase(0.1);
        easeFunction.setEasingMode(EasingFunction.EASINGMODE_EASEIN);
        this.setEasingFunction(easeFunction);
        const keyFrames = [];
        keyFrames.push({ frame: 0, value: startingPosition });
        keyFrames.push({ frame: frameRate, value: startingPosition.add(new Vector3(0, 0, 2500)) });
        this.setKeys(keyFrames);
    }
}
