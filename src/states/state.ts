/* eslint-disable @typescript-eslint/member-ordering */
import { Scene } from '@babylonjs/core';
import GameManager from '../game-managers/game-manager.js';
import { Inspector } from '@babylonjs/inspector';

export default abstract class State {
    readonly scene: Scene;
    private toggleInspectorListener: (ev: KeyboardEvent) => void;

    constructor(protected readonly gameManager: GameManager) {
        console.debug('Scene Created');
        this.scene = new Scene(this.gameManager.engine);
        this.toggleInspectorListener = (ev: KeyboardEvent) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === 'KeyI') {
                console.debug('Toggle Inspector');
                Inspector.IsVisible ? Inspector.Hide() : Inspector.Show(this.scene, {});
            }
        };
        if (import.meta.env.DEV) {
            console.debug('Attach Inspector');
            window.addEventListener('keydown', this.toggleInspectorListener);
        }
    }

    render(): void {
        if (!this.scene) throw new Error('Scene has not been initialized');
        this.scene.render();
    }

    dispose = (): void => {
        console.debug('Scene Disposed');
        window.removeEventListener('keydown', this.toggleInspectorListener);
        this.scene.detachControl();
        this.scene.dispose();
    };

    start = async () => {
        console.debug('Scene Started');
        // Start loading UI
        const engine = this.gameManager.engine;
        engine.displayLoadingUI();
        // Render scene
        await this.run();
        // End loading UI
        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
    };

    abstract run(): Promise<void>;
}
