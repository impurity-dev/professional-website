import * as BABYLON from '@babylonjs/core';
import * as RXJS from 'rxjs';
import { Asset, EntityManager } from '../managers/entity-manager';

export type Metadata = Record<string, string>;

export type ModelFactory = (props: InitProps) => Model;
export type EntityFactory = (props: InitProps) => Entity;
export type InitProps = { scene: BABYLON.Scene; entityManager: EntityManager; metadata?: Metadata };

type EntityProps = { name: string; scene: BABYLON.Scene; metadata?: Metadata };
export abstract class Entity {
    public readonly transform: BABYLON.TransformNode;
    protected readonly name: string;
    protected readonly scene: BABYLON.Scene;

    constructor(props: { name: string; scene: BABYLON.Scene; metadata?: Metadata }) {
        const { name, scene, metadata } = props;
        this.name = name;
        this.scene = scene;
        this.transform = new BABYLON.TransformNode(name, scene);
        this.transform.metadata = metadata;
    }
}

type ModelProps = { entityManager: EntityManager; asset: Asset } & EntityProps;
export class Model extends Entity {
    public readonly onLoad: RXJS.Subject<void> = new RXJS.Subject();
    private _entries: BABYLON.InstantiatedEntries | undefined;

    constructor(props: ModelProps) {
        const { name, scene, entityManager, asset, metadata } = props;
        super({ name, scene, metadata: metadata ? { ...asset, ...metadata } : asset });
        entityManager.queue(asset).add((task) => this.load(task));
    }

    get isLoaded(): boolean {
        return !!this._entries;
    }

    get entries() {
        if (!this._entries) throw new Error('Model is unloaded');
        return this._entries;
    }

    private set entries(entries: BABYLON.InstantiatedEntries) {
        this._entries = entries;
    }

    private load = (task: BABYLON.ContainerAssetTask) => {
        this.entries = task.loadedContainer.instantiateModelsToScene((n) => n, false, { doNotInstantiate: true });
        this.entries.rootNodes.forEach((node) => (node.parent = this.transform));
        this.transform.getChildMeshes().forEach((m) => {
            if (!m.isAnInstance) m.receiveShadows = true;
            m.checkCollisions = true;
            m.metadata = this.transform.metadata;
        });
        this.onLoad.next();
        this.onLoad.complete();
    };
}
