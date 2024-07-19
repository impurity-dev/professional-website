import * as BABYLON from '@babylonjs/core';
import * as RXJS from 'rxjs';

export const lerp = (start: number, end: number, delta: number) => start * delta + end * (1 - delta);

export const randomIntBetween = (min: number, max: number): number => {
    return Math.floor(Math.random() * max) + min;
};

export const randomNumberBetween = (min: number, max: number): number => {
    return Math.random() * max + min;
};

export const randomColor = (x?: number, y?: number, z?: number, a?: number): BABYLON.Color4 => {
    return new BABYLON.Color4(x ? x : Math.random(), y ? y : Math.random(), z ? z : Math.random(), a ? a : Math.random());
};

export const randomPointOnCylinder = (height: number, radius: number): BABYLON.Vector3 => {
    const s = randomNumberBetween(0, 1);
    const theta = randomNumberBetween(0, 2 * Math.PI);
    const r = Math.sqrt(s) * radius;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    const z = randomNumberBetween(0, height);
    return new BABYLON.Vector3(x, y, z);
};

export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Wraps a Babylon Observable into an rxjs Observable
 *
 * @param bjsObservable The Babylon Observable you want to observe
 * @example
 * ```
 * import { Engine, Scene, AbstractMesh } from '@babylonjs/core'
 *
 * const canvas = document.getElementById('canvas') as HTMLCanvasElement
 * const engine = new Engine(canvas)
 * const scene = new Scene(engine)
 *
 * const render$: Observable<Scene> = fromBabylonObservable(scene.onAfterRenderObservable)
 * const onMeshAdded$: Observable<AbstractMesh> = fromBabylonObservable(scene.onNewMeshAddedObservable)
 * ```
 */
export const fromBabylonObservable = <T>(bjsObservable: BABYLON.Observable<T>): RXJS.Observable<T> =>
    new RXJS.Observable<T>((subscriber) => {
        if (!(bjsObservable instanceof BABYLON.Observable)) {
            throw new TypeError('the object passed in must be a Babylon Observable');
        }
        const handler = bjsObservable.add((v) => subscriber.next(v));
        return () => bjsObservable.remove(handler);
    });
