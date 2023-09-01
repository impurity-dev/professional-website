import { Engine } from '@babylonjs/core';
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import GameManager from './game-managers/game-manager.js';

class App {
    private manager: GameManager;

    constructor() {
        const canvas = this.createCanvas();
        const engine = new Engine(canvas, true);
        window.addEventListener('resize', () => engine.resize());
        this.manager = new GameManager(canvas, engine);
        this.manager.start();
    }

    private createCanvas(): HTMLCanvasElement {
        document.documentElement.style['overflow'] = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.width = '100%';
        document.documentElement.style.height = '100%';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.margin = '0';
        document.body.style.padding = '0';

        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.id = 'gameCanvas';
        document.body.appendChild(canvas);

        return canvas;
    }
}
new App();
