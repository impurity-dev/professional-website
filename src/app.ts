import { Engine, Effect } from '@babylonjs/core';
import { GameManager } from './managers/game-manager.js';
import * as settings from './managers/settings-manager.js';
import { LoadingScreen } from './shared/loading-screen.js';
import { firstValueFrom, forkJoin, from, map, Observable, of, tap } from 'rxjs';

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
        const loadShader$ = (title: string) =>
            forkJoin([
                from(fetch(`./shaders/${title}.fragment.fx`).then((x) => x.text())),
                from(fetch(`./shaders/${title}.vertex.fx`).then((x) => x.text())),
            ]).pipe(tap(([frag, vert]) => Effect.RegisterShader(title, frag, vert)));

        const loadStore$ = (title: string) =>
            from(fetch(`./shaders/${title}.fx`).then((x) => x.text())).pipe(tap((shader) => (Effect.IncludesShadersStore[title] = shader)));

        await firstValueFrom(forkJoin([loadStore$('utils'), loadShader$('dissolve'), loadShader$('mandelbulb'), loadShader$('portal')]));
    };
}

const loadingDiv = document.getElementById('loading-screen') as HTMLDivElement;
const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
const engine = new Engine(canvas, true);
engine.loadingScreen = new LoadingScreen(loadingDiv);
const manager = new GameManager(canvas, engine);
const app = new App(engine, manager);
app.start();
