import { ContainerAssetTask, AssetsManager, AbstractAssetTask, IAssetsProgressEvent, Observable } from '@babylonjs/core';
import { logger } from '../helpers/logger';

export type Asset = { file: string; directory: string };

export class EntityManager {
    private _isLoaded: boolean = false;

    constructor(
        private readonly assetManager: AssetsManager,
        private readonly cache: Map<string, Observable<ContainerAssetTask>> = new Map(),
    ) {
        this.assetManager.onTaskSuccessObservable.add((task: AbstractAssetTask) => {
            logger.debug(`Finished loading ${task.name}`);
            this._isLoaded = true;
        });
        this.assetManager.onTaskErrorObservable.add((task: AbstractAssetTask) => logger.error(`Unable to load ${task.name}`));
        this.assetManager.onProgressObservable.add((event: IAssetsProgressEvent) =>
            logger.debug(`Assets loaded: ${event.totalCount - event.remainingCount}/${event.totalCount}`),
        );
        this.assetManager.onTasksDoneObservable.add((task: AbstractAssetTask[]) => logger.debug(`Finished loading ${task.length} assets`));
    }

    get isLoaded() {
        return this._isLoaded;
    }

    queue = (asset: Asset): Observable<ContainerAssetTask> => {
        if (this.isLoaded) {
            logger.error(`Asset manager already loaded! Cannot load ${asset}`);
            throw new Error(`Cannot load ${asset}. Manager finished.`);
        }
        const id = this.getId(asset);
        if (!this.cache.has(id)) {
            const task = this.assetManager.addContainerTask(`${id} task`, '', asset.directory, asset.file);
            const observable = new Observable<ContainerAssetTask>();
            observable.notifyIfTriggered = true;
            task.onSuccess = (task: ContainerAssetTask) => observable.notifyObservers(task);
            this.cache.set(id, observable);
        }
        return this.cache.get(id);
    };

    load = (): Promise<void> => {
        logger.debug('Starting to load assets...');
        return this.assetManager.loadAsync();
    };

    private getId = (asset: Asset) => `${asset.directory}${asset.file}`;
}
