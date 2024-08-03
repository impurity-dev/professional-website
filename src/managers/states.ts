import * as BABYLON from '@babylonjs/core';
import * as INSPECTOR from '@babylonjs/inspector';
import * as logger from '../shared/logger.js';
import { GameManager } from './game-manager.js';
import * as settings from './settings.js';
import { AssetFactory, NodeAsset } from '../nodes/nodes.js';
import { firstValueFrom, Subject, take, tap } from 'rxjs';

export abstract class State {
    readonly scene: BABYLON.Scene;
    readonly assetManager: BABYLON.AssetsManager;
    readonly assetFactory: AssetFactory;
    readonly start$: Subject<void> = new Subject();
    readonly destroy$: Subject<void> = new Subject();
    private isLoaded = false;

    /**
     * All assets to be loaded
     */
    abstract assets: NodeAsset[];

    /**
     * Create a unique state that represents the state of the overall game.
     * @param gameManager The global manager of the game used to manipulate and access global state.
     */
    constructor(protected readonly gameManager: GameManager) {
        logger.debug('Scene Created');
        this.scene = new BABYLON.Scene(this.gameManager.engine);
        this.assetManager = new BABYLON.AssetsManager(this.scene);
        this.assetManager.useDefaultLoadingScreen = false;
        this.assetManager.autoHideLoadingUI = false;
        this.assetFactory = new AssetFactory({ scene: this.scene, assetManager: this.assetManager });
        if (settings.global.isBabylonInpectorEnabled) {
            logger.debug('Attach Inspector');
            window.addEventListener('keydown', this.attachInspector);
        }
        this.start$
            .pipe(
                take(1),
                tap(() => (this.isLoaded = true)),
            )
            .subscribe();
    }

    /**
     * Render the scene by the engine. This should be only called within the
     * engines render lifecycle.
     */
    render = () => {
        if (!this.isLoaded) return;
        this.scene.render();
    };

    /**
     * Start the scene wraps around the run function.
     * This attaches a loading screen while we run our scene
     * and removed it once it is ready.
     */
    start = async () => {
        logger.debug('Scene Started');

        // Start loading UI
        this.scene.getEngine().displayLoadingUI();

        // Load assets
        this.assetFactory.queue(...this.assets);

        // Build scene
        await this.build(firstValueFrom(this.assetFactory.load$()));

        // End loading UI
        await this.scene.whenReadyAsync(true);
        this.scene.getEngine().hideLoadingUI();

        // signal completion
        this.start$.next();
        this.start$.complete();
    };

    /**
     * Dispose the scene by removing all hooks and destroying
     * our scene resources.
     */
    dispose = (): void => {
        logger.debug('Scene Disposed');
        window.removeEventListener('keydown', this.attachInspector);
        this.scene.detachControl();
        this.scene.dispose();

        // signal disposal
        this.destroy$.next();
        this.destroy$.complete();
    };

    /**
     * Unique build method required to be implemented by a state.
     * This defines what is in our unique state and the entities we
     * want to add to the scene.
     */
    abstract build(assetLoad$: Promise<void>): Promise<void>;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    private attachInspector = (ev: KeyboardEvent) => {
        // Shift+Ctrl+Alt+I
        if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === 'KeyI') {
            logger.debug('Toggle Inspector');
            INSPECTOR.Inspector.IsVisible ? INSPECTOR.Inspector.Hide() : INSPECTOR.Inspector.Show(this.scene, {});
        }
    };
}
