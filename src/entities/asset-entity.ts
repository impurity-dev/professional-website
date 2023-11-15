import { Asset, EntityManager } from '../managers/entity-manager';
import { TransformNode, Scene, Observable, ContainerAssetTask, InstantiatedEntries } from '@babylonjs/core';

export abstract class AssetEntity {
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
        entityManager
            .queue(asset)
            .add((task) => this.load(task.loadedContainer.instantiateModelsToScene((n) => `i-${n}`, false, { doNotInstantiate: false })));
    }

    protected load = (entries: InstantiatedEntries) => {
        entries.rootNodes.forEach((node) => (node.parent = this.transform));
        this.transform.getChildMeshes().forEach((m) => {
            m.receiveShadows = true;
            m.checkCollisions = true;
        });
    };
}
