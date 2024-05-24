import { Color4, Vector3 } from '@babylonjs/core';

export function randomIntBetween(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
}

export function randomNumberBetween(min: number, max: number): number {
    return Math.random() * max + min;
}

export function randomColor(x?: number, y?: number, z?: number, a?: number): Color4 {
    return new Color4(x ? x : Math.random(), y ? y : Math.random(), z ? z : Math.random(), a ? a : Math.random());
}

export function randomPointOnCylinder(height: number, radius: number): Vector3 {
    const s = randomNumberBetween(0, 1);
    const theta = randomNumberBetween(0, 2 * Math.PI);
    const r = Math.sqrt(s) * radius;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    const z = randomNumberBetween(0, height);
    return new Vector3(x, y, z);
}

export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
