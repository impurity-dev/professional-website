import { Effect, Engine } from '@babylonjs/core';
import { GameManager } from './managers/game-manager.js';
import * as settings from './managers/settings.js';
import dissolveFrag from './shaders/dissolve.fragment.fx?raw';
import dissolveVert from './shaders/dissolve.vertex.fx?raw';
import mandelbulbFrag from './shaders/mandelbulb.fragment.fx?raw';
import mandelbulbVert from './shaders/mandelbulb.vertex.fx?raw';
import portalFrag from './shaders/portal.fragment.fx?raw';
import portalVert from './shaders/portal.vertex.fx?raw';
import utils from './shaders/utils.fx?raw';
import { LoadingScreen } from './shared/loading-screen.js';

class App {
    constructor(
        private readonly engine: Engine,
        private readonly manager: GameManager,
    ) {}

    start = async (): Promise<void> => {
        await Promise.all([document.fonts.ready, this.preload()]);
        window.addEventListener('resize', () => this.engine.resize());
        await this.manager.goTo({ type: settings.global.startScene });
        this.engine.runRenderLoop(() => this.manager.state.render());
    };

    private preload = async () => {
        Effect.RegisterShader('mandelbulb', mandelbulbFrag, mandelbulbVert);
        Effect.RegisterShader('dissolve', dissolveFrag, dissolveVert);
        Effect.RegisterShader('portal', portalFrag, portalVert);
        Effect.IncludesShadersStore['utils'] = utils;
    };
}

const loadingDiv = document.getElementById('loading-screen') as HTMLDivElement;
const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
const engine = new Engine(canvas, true);
engine.loadingScreen = new LoadingScreen(loadingDiv);
const manager = new GameManager(canvas, engine);
const app = new App(engine, manager);
app.start();
