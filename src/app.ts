import { Engine, Effect } from '@babylonjs/core';
import { GameManager } from './managers/game-manager.js';
import * as settings from './managers/settings-manager.js';
import { LoadingScreen } from './shared/loading-screen.js';

class App {
    constructor(
        private readonly engine: Engine,
        private readonly manager: GameManager,
    ) {}

    start = async (): Promise<void> => {
        await document.fonts.ready;
        await this.preload();
        window.addEventListener('resize', () => this.engine.resize());
        await this.manager.goTo({ type: settings.manager.startScene });
        this.engine.runRenderLoop(() => this.manager.getState().render());
    };

    private preload = async () => {
        const [utils, mandelbulbFrag, mandelbulbVert, dissolveFrag, dissolveVert, portalFrag, portalVert] = await Promise.all([
            fetch('./shaders/utils.fx').then((x) => x.text()),
            fetch('./shaders/mandelbulb.fragment.fx').then((x) => x.text()),
            fetch('./shaders/mandelbulb.vertex.fx').then((x) => x.text()),
            fetch('./shaders/dissolve.fragment.fx').then((x) => x.text()),
            fetch('./shaders/dissolve.vertex.fx').then((x) => x.text()),
            fetch('./shaders/portal.fragment.fx').then((x) => x.text()),
            fetch('./shaders/portal.vertex.fx').then((x) => x.text()),
        ]);
        Effect.IncludesShadersStore['utils'] = utils;
        Effect.RegisterShader('mandelbulb', mandelbulbFrag, mandelbulbVert);
        Effect.RegisterShader('dissolve', dissolveFrag, dissolveVert);
        Effect.RegisterShader('portal', portalFrag, portalVert);
    };
}

const loadingDiv = document.getElementById('loading-screen') as HTMLDivElement;
const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
const engine = new Engine(canvas, true);
engine.loadingScreen = new LoadingScreen(loadingDiv);
const manager = new GameManager(canvas, engine);
const app = new App(engine, manager);
app.start();
