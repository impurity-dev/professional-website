import * as BABYLON from '@babylonjs/core';

export const mandelbulb = (props: { scene: BABYLON.Scene; camera: BABYLON.ArcRotateCamera }) => {
    const { scene, camera } = props;
    let time = 0;
    const rate = 0.01;
    scene.registerBeforeRender(() => {
        camera.alpha = time;
        time += scene.getAnimationRatio() * rate;
    });

    const postEffect = new BABYLON.PostProcess('mandelbulb', 'mandelbulb', ['iTime', 'iResolution'], [], 1, camera);

    postEffect.onApply = (effect) => {
        effect.setVector2('iResolution', new BABYLON.Vector2(postEffect.width, postEffect.height));
        effect.setFloat('iTime', time);
    };
    return postEffect;
};
