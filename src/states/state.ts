/* eslint-disable @typescript-eslint/member-ordering */
import { Scene } from '@babylonjs/core';
import GameManager from '../game-managers/game-manager.js';
import { Inspector } from '@babylonjs/inspector';

export default abstract class State {
    protected inspectorEventListener: (ev: KeyboardEvent) => void;
    private _scene: Scene;

    protected set scene(newScene: Scene) {
        this._scene = newScene;
        if (import.meta.env.DEV) this.attachInspector(this._scene);
    }

    protected get scene(): Scene {
        return this._scene;
    }

    constructor(protected readonly gameManager: GameManager) {
        console.debug('Scene Created');
    }

    render(): void {
        if (!this.scene) throw new Error('Scene has not been initialized');
        this.scene.render();
    }

    dispose = (): void => {
        console.debug('Scene Disposed');
        window.removeEventListener('keydown', this.inspectorEventListener);
        this.scene.detachControl();
        this.scene.dispose();
    };

    private attachInspector = (scene: Scene): void => {
        console.debug('Attach Inspector');
        this.inspectorEventListener = (ev: KeyboardEvent) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === 'KeyI') {
                console.debug('Toggle Inspector');
                Inspector.IsVisible ? Inspector.Hide() : Inspector.Show(scene, {});
            }
        };
        window.addEventListener('keydown', this.inspectorEventListener);
    };

    abstract run(): Promise<void>;
}
