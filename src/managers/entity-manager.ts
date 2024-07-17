import * as BABYLON from '@babylonjs/core';
import * as logger from '../shared/logger.js';

export type Asset = { file: string; directory: string };

export class EntityManager {
    private _isLoaded: boolean = false;

    constructor(
        private readonly assetManager: BABYLON.AssetsManager,
        private readonly cache: Map<string, BABYLON.Observable<BABYLON.ContainerAssetTask>> = new Map(),
    ) {
        this.assetManager.onTaskSuccessObservable.add((task: BABYLON.AbstractAssetTask) => {
            logger.debug(`Finished loading ${task.name}`);
            this.isLoaded = true;
        });
        this.assetManager.onTaskErrorObservable.add((task: BABYLON.AbstractAssetTask) => logger.error(`Unable to load ${task.name} :: ${task.errorObject.message}`));
        this.assetManager.onProgressObservable.add((event: BABYLON.IAssetsProgressEvent) =>
            logger.debug(`Assets loaded: ${event.totalCount - event.remainingCount}/${event.totalCount}`),
        );
        this.assetManager.onTasksDoneObservable.add((task: BABYLON.AbstractAssetTask[]) => logger.debug(`Finished loading ${cache.size} assets`));
    }

    get isLoaded() {
        return this._isLoaded;
    }

    private set isLoaded(isLoaded: boolean) {
        this._isLoaded = isLoaded;
    }

    test = (asset: Asset): void => {
        const id = this.getId(asset);
        if (this.cache.has(id)) return;
        const task = this.assetManager.addContainerTask(`${id} task`, '', asset.directory, asset.file);
        const observable = new BABYLON.Observable<BABYLON.ContainerAssetTask>();
        observable.notifyIfTriggered = true;
        task.onSuccess = (task: BABYLON.ContainerAssetTask) => observable.notifyObservers(task);
        this.cache.set(id, observable);
    };

    queue = (asset: Asset): BABYLON.Observable<BABYLON.ContainerAssetTask> => {
        const id = this.getId(asset);
        if (this.cache.has(id)) return this.cache.get(id);
        if (this.isLoaded) {
            logger.error(`Asset manager already loaded! Cannot load ${JSON.stringify(asset)}`);
            throw new Error(`Cannot load ${JSON.stringify(asset)}. Manager finished.`);
        }
        const task = this.assetManager.addContainerTask(`${id} task`, '', asset.directory, asset.file);
        const observable = new BABYLON.Observable<BABYLON.ContainerAssetTask>();
        observable.notifyIfTriggered = true;
        task.onSuccess = (task: BABYLON.ContainerAssetTask) => observable.notifyObservers(task);
        return this.cache.set(id, observable).get(id);
    };

    load = () => this.assetManager.loadAsync();

    private getId = (asset: Asset) => `${asset.directory}${asset.file}`;
}
