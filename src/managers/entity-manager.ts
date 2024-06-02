import { ContainerAssetTask, AssetsManager, AbstractAssetTask, IAssetsProgressEvent, Observable } from '@babylonjs/core';
import { logger } from '../helpers/logger';
import * as utils from '../helpers/utils';

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
        this.assetManager.onProgressObservable.add((event: IAssetsProgressEvent) => logger.debug(`Assets loaded: ${event.totalCount - event.remainingCount}/${event.totalCount}`));
        this.assetManager.onTasksDoneObservable.add((task: AbstractAssetTask[]) => logger.debug(`Finished loading ${task.length} assets`));
    }

    get isLoaded() {
        return this._isLoaded;
    }

    test = (asset: Asset): void => {
        const id = this.getId(asset);
        if (this.cache.has(id)) return;
        const task = this.assetManager.addContainerTask(`${id} task`, '', asset.directory, asset.file);
        const observable = new Observable<ContainerAssetTask>();
        observable.notifyIfTriggered = true;
        task.onSuccess = (task: ContainerAssetTask) => observable.notifyObservers(task);
        this.cache.set(id, observable);
    };

    queue = (asset: Asset): Observable<ContainerAssetTask> => {
        const id = this.getId(asset);
        if (this.cache.has(id)) return this.cache.get(id);
        if (this.isLoaded) {
            logger.error(`Asset manager already loaded! Cannot load ${JSON.stringify(asset)}`);
            throw new Error(`Cannot load ${JSON.stringify(asset)}. Manager finished.`);
        }
        const task = this.assetManager.addContainerTask(`${id} task`, '', asset.directory, asset.file);
        const observable = new Observable<ContainerAssetTask>();
        observable.notifyIfTriggered = true;
        task.onSuccess = (task: ContainerAssetTask) => observable.notifyObservers(task);
        return this.cache.set(id, observable).get(id);
    };

    load = () => this.assetManager.loadAsync();

    private getId = (asset: Asset) => `${asset.directory}${asset.file}`;
}
