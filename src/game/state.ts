import { Scene } from '@babylonjs/core';
import GameManager from './game-manager';

export default abstract class State {
    protected scene: Scene;

    constructor(protected gameManager: GameManager) {}

    render(): void {
        if (!this.scene) throw new Error('Scene has not been initialized');
        this.scene.render();
    }

    goToStart(): void {
        throw new Error('Go to start not implemented');
    }

    goToTravel(): void {
        throw new Error('Go to travel not implemented');
    }

    goToOrbit(): void {
        throw new Error('Go to Start not implemented');
    }

    abstract run(): Promise<void>;
}
