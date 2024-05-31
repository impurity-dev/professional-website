import { AssetsManager, Scene } from '@babylonjs/core';
import { GameManager } from '../managers/game-manager.js';
import { Inspector } from '@babylonjs/inspector';
import { env } from '../managers/env-manager.js';
import { logger } from '../helpers/logger.js';
import { EntityManager } from '../managers/entity-manager.js';

export abstract class State {
    readonly scene: Scene;
    readonly assetManager: AssetsManager;
    readonly entityManager: EntityManager;

    /**
     * Create a unique state that represents the state of the overall game.
     * @param gameManager The global manager of the game used to manipulate and access global state.
     */
    constructor(protected readonly gameManager: GameManager) {
        logger.debug('Scene Created');
        this.scene = new Scene(this.gameManager.engine);
        this.assetManager = new AssetsManager(this.scene);
        this.entityManager = new EntityManager(this.assetManager);
        if (env.isBabylonInpectorEnabled) {
            logger.debug('Attach Inspector');
            window.addEventListener('keydown', this.attachInspector);
        }
    }

    /**
     * Render the scene by the engine. This should be only called within the
     * engines render lifecycle.
     */
    render = () => {
        if (!this.scene) throw new Error('Scene has not been initialized');
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
        const { engine } = this.gameManager;
        engine.displayLoadingUI();

        // Render scene
        await this.run();

        // End loading UI
        await this.scene.whenReadyAsync();
        engine.hideLoadingUI();
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
    };

    /**
     * Unique run method required to be implemented by a state.
     * This defines what is in our unique state and the entities we
     * want to add to the scene.
     */
    abstract run(): Promise<void>;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    private attachInspector = (ev: KeyboardEvent) => {
        // Shift+Ctrl+Alt+I
        if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.code === 'KeyI') {
            logger.debug('Toggle Inspector');
            Inspector.IsVisible ? Inspector.Hide() : Inspector.Show(this.scene, {});
        }
    };
}
