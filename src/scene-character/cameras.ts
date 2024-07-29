import * as BABYLON from '@babylonjs/core';
import { filter, take, tap } from 'rxjs';
import * as localEvents from './events';

export const mainCamera = (props: { scene: BABYLON.Scene; target: BABYLON.Vector3; events: localEvents.Events }) => {
    const { scene, target, events } = props;
    const camera = new BABYLON.ArcRotateCamera('fps-camera', 2.2, 1.2, 5, target, scene);
    scene.activeCamera = camera;
    const startAnimation = new BABYLON.Animation(
        'movecamera',
        'alpha',
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
    );
    const ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    const keys = [
        { frame: 0, value: 2.2 },
        { frame: 60, value: 3 },
    ];
    startAnimation.setKeys(keys);
    camera.animations = [startAnimation];
    events.state$
        .pipe(
            filter((state) => state.type === 'dialogue' && state.props.index === 0),
            take(1),
            tap(() => scene.beginAnimation(camera, 0, 60, false, 1.7)),
        )
        .subscribe();
    return camera;
};
