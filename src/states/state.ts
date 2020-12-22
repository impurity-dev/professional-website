import { Scene } from '@babylonjs/core';
import GameManager from '../game-managers/game-manager';

export default abstract class State {
    private _scene: Scene;

    protected set scene(newScene: Scene) {
        this._scene = newScene;
        if (window.location.href.includes('localhost')) this.attachInspector(newScene);
    }

    protected get scene(): Scene {
        return this._scene;
    }

    constructor(protected gameManager: GameManager) {}

    render(): void {
        if (!this.scene) throw new Error('Scene has not been initialized');
        this.scene.render();
    }

    async goToStart(): Promise<void> {
        throw new Error('Go to start not implemented');
    }

    async goToTravel(): Promise<void> {
        throw new Error('Go to travel not implemented');
    }

    async goToOrbit(): Promise<void> {
        throw new Error('Go to Start not implemented');
    }

    private attachInspector(scene: Scene): void {
        window.addEventListener('keydown', (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                scene.debugLayer.isVisible() ? scene.debugLayer.hide() : scene.debugLayer.show();
            }
        });
    }

    abstract run(): Promise<void>;
}
