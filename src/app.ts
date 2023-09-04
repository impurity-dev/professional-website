import { Engine } from '@babylonjs/core';
import GameManager from './game-managers/game-manager.js';

class App {
    constructor(
        private readonly engine: Engine,
        private readonly manager: GameManager,
    ) {
        window.addEventListener('resize', () => this.engine.resize());
        this.manager.goTo({ type: 'start' });
        this.engine.runRenderLoop(() => this.manager.getState().render());
    }
}

const getCanvas = (): HTMLCanvasElement => {
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
};

const canvas = getCanvas();
const engine = new Engine(canvas, true);
const manager = new GameManager(canvas, engine);
new App(engine, manager);
