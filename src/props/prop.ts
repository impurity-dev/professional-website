import { Asset, EntityManager } from '../managers/entity-manager';
import { TransformNode, Scene, Observable, ContainerAssetTask } from '@babylonjs/core';

export abstract class Prop {
    readonly transform: TransformNode;
    protected readonly observable: Observable<ContainerAssetTask>;

    constructor(
        protected readonly name: string,
        protected readonly scene: Scene,
        protected readonly entityManager: EntityManager,
        protected readonly asset: Asset,
    ) {
        this.transform = new TransformNode(name, scene);
        this.transform.metadata = asset;
        entityManager.queue(asset).add((task) => this.load(task));
    }

    protected abstract load(task: ContainerAssetTask): void;
}
