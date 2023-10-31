import {
    ContainerAssetTask,
    AssetsManager,
    AbstractAssetTask,
    EventState,
    IAssetsProgressEvent,
    TransformNode,
    InstantiatedEntries,
} from '@babylonjs/core';
import { logger } from '../helpers/logger';

export type Asset = { file: string; directory: string };

export class ExternalAssetManager {
    constructor(
        private readonly assetManager: AssetsManager,
        private readonly cache: Map<string, ContainerAssetTask> = new Map(),
    ) {
        this.assetManager.onTaskSuccessObservable.add((task: AbstractAssetTask, state: EventState) => {
            logger.debug(`[EAM] Finished loading ${task.name}`);
        });
        this.assetManager.onTaskErrorObservable.add((task: AbstractAssetTask, state: EventState) => {
            logger.error(`[EAM] Unable to load ${task.name}`);
        });
        this.assetManager.onProgressObservable.add((event: IAssetsProgressEvent, state: EventState) => {
            logger.debug(`[EAM] Assets loaded: ${event.totalCount - event.remainingCount}/${event.totalCount}`);
        });
        this.assetManager.onTasksDoneObservable.add((task: AbstractAssetTask[], state: EventState) => {
            logger.debug(`[EAM] Finished loading ${task.length} assets`);
        });
    }

    queue = (asset: Asset): void => {
        const id = this.getId(asset);
        if (this.cache.has(id)) {
            logger.debug(`${id} already queued.`);
            return;
        }
        const task = this.assetManager.addContainerTask(`${id} task`, '', asset.directory, asset.file);
        this.cache.set(id, task);
    };

    load = (): Promise<void> => {
        logger.debug('Starting to load assets...');
        return this.assetManager.loadAsync();
    };

    get = (asset: Asset): TransformNode => {
        const id = this.getId(asset);
        if (!this.cache.has(id)) {
            logger.error(`${id} not initialized.`);
            throw new Error(`The external asset manager never initialized asset: ${id}`);
        }
        const container = this.cache.get(id);
        if (!container.isCompleted) {
            logger.error(`${id} did not complete loading.`);
            throw new Error(`The container for ${id} has not completed. Make sure to call 'loadAssets' before using assets.`);
        }
        const entries: InstantiatedEntries = this.cache.get(id).loadedContainer.instantiateModelsToScene();
        const parent = new TransformNode(asset.file);
        parent.metadata = asset;
        entries.rootNodes.forEach((node) => (node.parent = parent));
        return parent;
    };

    private getId = (asset: Asset) => asset.directory + asset.file;
}
