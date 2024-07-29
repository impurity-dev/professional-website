import * as BABYLON from '@babylonjs/core';
import * as gm from './managers/game-manager.js';
import * as settings from './managers/settings.js';
import dissolveFrag from './shaders/dissolve.fragment.fx?raw';
import dissolveVert from './shaders/dissolve.vertex.fx?raw';
import mandelbulbFrag from './shaders/mandelbulb.fragment.fx?raw';
import mandelbulbVert from './shaders/mandelbulb.vertex.fx?raw';
import portalFrag from './shaders/portal.fragment.fx?raw';
import portalVert from './shaders/portal.vertex.fx?raw';
import utils from './shaders/utils.fx?raw';
import * as loading from './shared/loading-screen.js';

class App {
    constructor(
        private readonly engine: BABYLON.Engine,
        private readonly manager: gm.GameManager,
    ) {}

    start = async (): Promise<void> => {
        await Promise.all([document.fonts.ready, this.preload()]);
        window.addEventListener('resize', () => this.engine.resize());
        await this.manager.goTo({ type: settings.global.startScene });
        this.engine.runRenderLoop(() => this.manager.state.render());
    };

    private preload = async () => {
        BABYLON.Effect.RegisterShader('mandelbulb', mandelbulbFrag, mandelbulbVert);
        BABYLON.Effect.RegisterShader('dissolve', dissolveFrag, dissolveVert);
        BABYLON.Effect.RegisterShader('portal', portalFrag, portalVert);
        BABYLON.Effect.IncludesShadersStore['utils'] = utils;
    };
}

const loadingDiv = document.getElementById('loading-screen') as HTMLDivElement;
const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
engine.loadingScreen = new loading.LoadingScreen(loadingDiv);
const manager = new gm.GameManager(canvas, engine);
const app = new App(engine, manager);
app.start();
