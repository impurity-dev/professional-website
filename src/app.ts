import { Engine, Effect } from '@babylonjs/core';
import { GameManager } from './managers/game-manager.js';
import { LoadingScreen } from './loading-screens/loading-screen.js';
import Lottie from 'lottie-web';

class App {
    constructor(
        private readonly engine: Engine,
        private readonly manager: GameManager,
    ) {}

    start = async (): Promise<void> => {
        await this.preload();
        window.addEventListener('resize', () => this.engine.resize());
        await this.manager.goTo({ type: 'menu' });
        this.engine.runRenderLoop(() => this.manager.getState().render());
    };

    private preload = async () => {
        const utilsShader = await fetch('./shaders/utils.fx');
        const mandelbulbShader = await fetch('./shaders/mandelbulb.fragment.fx');
        Effect.IncludesShadersStore['utils'] = await utilsShader.text();
        Effect.ShadersStore['mandelbulbFragmentShader'] = await mandelbulbShader.text();
    };
}

const loadingDiv = document.getElementById('loading-screen') as HTMLDivElement;
const animation = Lottie.loadAnimation({
    container: loadingDiv,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './loading.json',
});
animation.play();
const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
const engine = new Engine(canvas, true);
engine.loadingScreen = new LoadingScreen(loadingDiv);
const manager = new GameManager(canvas, engine);
const app = new App(engine, manager);
app.start();
