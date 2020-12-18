import { Scene } from '@babylonjs/core';

export function attachInspector(scene: Scene): void {
    window.addEventListener('keydown', (ev) => {
        // Shift+Ctrl+Alt+I
        if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
            scene.debugLayer.isVisible() ? scene.debugLayer.hide() : scene.debugLayer.show();
        }
    });
}
