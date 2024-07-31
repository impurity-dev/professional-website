import * as BABYLON from '@babylonjs/core';

export const engineStart = (props: { start: BABYLON.Vector3; end: BABYLON.Vector3 }) => {
    const { start, end } = props;
    const animation = new BABYLON.Animation(
        'engineStart',
        'position',
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
        true,
    );
    const ease = new BABYLON.ExponentialEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
    animation.setEasingFunction(ease);
    animation.setKeys([
        {
            frame: 0,
            value: start,
        },
        {
            frame: 60,
            value: end,
        },
    ]);
    return animation;
};
