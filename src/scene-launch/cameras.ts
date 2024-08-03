import { delay, filter, mergeMap, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import * as localEvents from './events';
import * as BABYLON from '@babylonjs/core';

export const playerCamera = (props: {
    scene: BABYLON.Scene;
    location: BABYLON.Vector3;
    target: BABYLON.Vector3;
    parent: BABYLON.TransformNode;
    events: localEvents.Events;
}) => {
    const { scene, location, target, parent, events } = props;
    const camera = new BABYLON.UniversalCamera('fps-camera', location, scene);
    camera.parent = parent;
    camera.target = target;
    camera.minZ = 0.1;
    scene.activeCamera = camera;
    const motionBlur = new BABYLON.MotionBlurPostProcess('mb', scene, 1.0, camera);

    events.state$
        .pipe(
            filter((state) => state.type === 'launch'),
            take(1),
            delay(2_000),
            mergeMap(() => fastFov$({ camera, scene, motionBlur })),
            takeUntil(events.destroy$),
        )
        .subscribe();
    events.state$
        .pipe(
            filter((state) => state.type === 'space'),
            take(1),
            delay(250),
            mergeMap(() => slowFov$({ camera, scene, motionBlur })),
            takeUntil(events.destroy$),
        )
        .subscribe();

    events.state$.pipe(tap((state) => console.log(state))).subscribe();
    return { playerCamera: camera };
};

const START_FOV = 0.8;
const END_FOV = 1.2;
const fastFov$ = (props: { camera: BABYLON.UniversalCamera; scene: BABYLON.Scene; motionBlur: BABYLON.MotionBlurPostProcess }): Observable<void> => {
    const { camera, scene, motionBlur } = props;
    const animation = new BABYLON.Animation('fastFov', 'fov', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, true);
    const ease = new BABYLON.ExponentialEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
    animation.setEasingFunction(ease);
    animation.setKeys([
        {
            frame: 0,
            value: START_FOV,
        },
        {
            frame: 60,
            value: END_FOV,
        },
    ]);
    camera.animations = [animation];
    motionBlur.motionStrength = 1_000;
    const finished$ = new Subject<void>();
    scene.beginAnimation(camera, 0, 60, false, 1, () => {
        finished$.next();
        finished$.complete();
    });
    return finished$;
};

const slowFov$ = (props: { camera: BABYLON.UniversalCamera; scene: BABYLON.Scene; motionBlur: BABYLON.MotionBlurPostProcess }): Observable<void> => {
    const { camera, scene, motionBlur } = props;
    const animation = new BABYLON.Animation('slowFov', 'fov', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE, true);
    camera.animations = [animation];
    const ease = new BABYLON.ExponentialEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
    animation.setEasingFunction(ease);
    animation.setKeys([
        {
            frame: 0,
            value: END_FOV,
        },
        {
            frame: 60,
            value: START_FOV,
        },
    ]);
    motionBlur.motionStrength = 0;
    const finished$ = new Subject<void>();
    scene.beginAnimation(camera, 0, 60, false, 3, () => {
        finished$.next();
        finished$.complete();
    });
    return finished$;
};
