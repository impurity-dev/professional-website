import * as BABYLON from '@babylonjs/core';
import * as logger from '../shared/logger.js';
import { from, tap } from 'rxjs';

export type NodeAsset = ContainerNodeAsset | MeshNodeAsset;
export type ContainerNodeAsset = { type: 'container'; file: string; directory: string; meshes?: string[] };
export type MeshNodeAsset = { type: 'mesh'; file: string; directory: string; meshes?: string[] };
export class AssetFactory {
    readonly scene: BABYLON.Scene;
    private _isLoaded: boolean = false;
    private readonly assetManager: BABYLON.AssetsManager;
    private readonly taskCache = new Map<string, NodeAsset>();
    private readonly assetCache = {
        container: new Map<string, BABYLON.ContainerAssetTask>(),
        mesh: new Map<string, BABYLON.MeshAssetTask>(),
    };

    constructor(props: { scene: BABYLON.Scene; assetManager: BABYLON.AssetsManager }) {
        const { scene, assetManager } = props;
        this.scene = scene;
        this.assetManager = assetManager;
        this.assetManager.onTaskSuccessObservable.add((task: BABYLON.AbstractAssetTask) => {
            logger.debug(`Finished loading ${task.name}`);
            this.isLoaded = true;
        });
        this.assetManager.onTaskErrorObservable.add((task: BABYLON.AbstractAssetTask) =>
            logger.error(`Unable to load ${task.name} :: ${task.errorObject.message}`),
        );
        this.assetManager.onProgressObservable.add((event: BABYLON.IAssetsProgressEvent) => {
            logger.debug(`Assets loaded: ${event.totalCount - event.remainingCount}/${event.totalCount}`);
            this.scene.getEngine().loadingUIText = `Loading ${event.totalCount - event.remainingCount}/${event.totalCount} assets...`;
        });
        this.assetManager.onTasksDoneObservable.add(() => logger.debug(`Finished loading ${this.taskCache.size} assets`));
    }

    get isLoaded() {
        return this._isLoaded;
    }

    private set isLoaded(isLoaded: boolean) {
        this._isLoaded = isLoaded;
    }

    load$ = (...assets: NodeAsset[]) => {
        if (this.isLoaded) throw new Error('Container factory already loaded!');
        logger.info('Loading assets...');
        assets.forEach((asset) => {
            const id = this.getId(asset);
            if (this.assetCache[asset.type].has(id)) {
                logger.warn(`Asset ${JSON.stringify(asset)} has already been added.`);
                return;
            }
            this.addTask(asset, id);
        });
        return from(this.assetManager.loadAsync()).pipe(tap(() => logger.info('Finished loading assets.')));
    };

    getContainer = (
        asset: ContainerNodeAsset,
        args: { cloneMaterials: boolean; doNotInstantiate: boolean } = { cloneMaterials: false, doNotInstantiate: true },
    ) => {
        const id = this.getId(asset);
        if (!this.assetCache[asset.type].has(id)) throw new Error(`Asset ${id} has not loaded.`);
        const { cloneMaterials, doNotInstantiate } = args;
        const predicate = asset.meshes ? (p) => asset.meshes.includes(p.name) : undefined;
        const entries = this.assetCache[asset.type].get(id).loadedContainer.instantiateModelsToScene((n) => n, cloneMaterials, { doNotInstantiate, predicate });
        return new AssetNode({
            name: id,
            scene: this.scene,
            entries,
        });
    };

    getMesh = (asset: MeshNodeAsset) => {
        const id = this.getId(asset);
        if (!this.assetCache[asset.type].has(id)) throw new Error(`Asset ${JSON.stringify(asset)} has not loaded.`);
        return this.assetCache[asset.type].get(id).loadedMeshes;
    };

    private getId = (asset: NodeAsset) => (asset.meshes ? `${asset.directory}${asset.file}/${asset.meshes.join(',')}` : `${asset.directory}${asset.file}`);
    private addTask = (asset: NodeAsset, id: string) => {
        switch (asset.type) {
            case 'container': {
                const task = this.assetManager.addContainerTask(id, asset.meshes ?? '', asset.directory, asset.file);
                this.assetCache.container.set(id, task);
                return;
            }
            case 'mesh': {
                const task = this.assetManager.addMeshTask(id, asset.meshes ?? '', asset.directory, asset.file);
                this.assetCache.mesh.set(id, task);
                return;
            }
            default:
                throw new Error('Unsupported asset type to queue');
        }
    };
}

export class AssetNode extends BABYLON.TransformNode {
    private readonly entries: BABYLON.InstantiatedEntries;
    private readonly scene: BABYLON.Scene;
    constructor(props: { name: string; scene: BABYLON.Scene; entries: BABYLON.InstantiatedEntries }) {
        const { name, scene, entries } = props;
        super(name, scene, false);
        this.entries = entries;
        this.entries.rootNodes.forEach((node) => (node.parent = this));
        this.scene = scene;
    }

    get animationGroups() {
        return this.entries.animationGroups;
    }

    set collidable(isCollidable: boolean) {
        this.getChildMeshes().forEach((m) => {
            if (!m.isAnInstance) m.receiveShadows = isCollidable;
            m.checkCollisions = isCollidable;
        });
    }

    clone = () => new AssetNode({ name: this.name, scene: this.scene, entries: this.entries });
}
