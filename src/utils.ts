import { Scene, Color4 } from '@babylonjs/core';

export function attachInspector(scene: Scene): void {
    window.addEventListener('keydown', (ev) => {
        // Shift+Ctrl+Alt+I
        if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
            scene.debugLayer.isVisible() ? scene.debugLayer.hide() : scene.debugLayer.show();
        }
    });
}

export function randomNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
}

export function randomColor(x?: number, y?: number, z?: number, a?: number): Color4 {
    return new Color4(!!x ? x : Math.random(), !!y ? y : Math.random(), !!z ? z : Math.random(), !!a ? a : Math.random());
}
