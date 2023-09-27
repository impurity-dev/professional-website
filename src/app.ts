import { Engine, Effect } from '@babylonjs/core';
import { GameManager } from './managers/game-manager.js';
import { LoadingScreen } from './loading-screens/loading-screen.js';

class App {
    constructor(
        private readonly engine: Engine,
        private readonly manager: GameManager,
    ) {}

    start = async (): Promise<void> => {
        await this.preload();
        window.addEventListener('resize', () => this.engine.resize());
        await this.manager.goTo({ type: 'practice' });
        this.engine.runRenderLoop(() => this.manager.getState().render());
    };

    private preload = async () => {
        const utilsShader = await fetch('./shaders/utils.fx');
        Effect.IncludesShadersStore['utils'] = await utilsShader.text();
    };
}

const loadingDiv = document.getElementById('loading-screen') as HTMLDivElement;
const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
const loadingScreen = new LoadingScreen(loadingDiv);
const engine = new Engine(canvas, true);
const manager = new GameManager(canvas, loadingScreen, engine);
const app = new App(engine, manager);
app.start();
