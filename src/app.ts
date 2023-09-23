import { Engine } from '@babylonjs/core';
import GameManager from './game-managers/game-manager.js';
import { LoadingScreen } from './loading-screens/loading-screen.js';

class App {
    constructor(
        private readonly engine: Engine,
        private readonly manager: GameManager,
    ) {}

    start = async (): Promise<void> => {
        window.addEventListener('resize', () => this.engine.resize());
        await this.manager.goTo({ type: 'start' });
        this.engine.runRenderLoop(() => this.manager.getState().render());
    };
}

const loadingDiv = document.getElementById('loading-screen') as HTMLDivElement;
const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
const loadingScreen = new LoadingScreen(loadingDiv);
const engine = new Engine(canvas, true);
const manager = new GameManager(canvas, loadingScreen, engine);
const app = new App(engine, manager);
app.start();
