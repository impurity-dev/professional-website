import { Scene } from '@babylonjs/core';
import GameManager from '../game-managers/game-manager';

export default abstract class State {
    protected inspectorEventListener: (ev: KeyboardEvent) => void;
    private _scene: Scene;

    protected set scene(newScene: Scene) {
        this._scene = newScene;
        if (window.location.href.includes('localhost')) this.attachInspector(this._scene);
    }

    protected get scene(): Scene {
        return this._scene;
    }

    constructor(protected gameManager: GameManager) {
        console.debug('Scene Created');
    }

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

    public dispose(): void {
        console.debug('Scene Disposed');
        window.removeEventListener('keydown', this.inspectorEventListener);
        this.scene.detachControl();
        this.scene.dispose();
    }

    private attachInspector(scene: Scene): void {
        console.debug('Attach Inspector');
        this.inspectorEventListener = (ev: KeyboardEvent) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === 'KeyI') {
                console.debug('Toggle Inspector');
                scene.debugLayer.isVisible() ? scene.debugLayer.hide() : scene.debugLayer.show();
            }
        };
        window.addEventListener('keydown', this.inspectorEventListener);
    }

    abstract run(): Promise<void>;
}
