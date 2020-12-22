import { Animation, BackEase, EasingFunction, Vector3 } from '@babylonjs/core';

export default class ShipLaunchAnimation extends Animation {
    constructor(private readonly startingPosition: Vector3, public readonly frameRate: number) {
        super('ShipLaunchAnimation', 'position', frameRate, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        const easeFunction = new BackEase();
        easeFunction.setEasingMode(EasingFunction.EASINGMODE_EASEIN);
        this.setEasingFunction(easeFunction);
        const keyFrames = [];
        keyFrames.push({ frame: 0, value: startingPosition });
        keyFrames.push({ frame: frameRate, value: startingPosition.add(new Vector3(0, 0, 500)) });
        this.setKeys(keyFrames);
    }
}
