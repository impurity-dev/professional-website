import * as assets from '../assets';
import { EntityManager } from '../managers/entity-manager';
import { Scene, ContainerAssetTask, InstantiatedEntries } from '@babylonjs/core';
import { Prop } from './prop';

export class FloorTileBasic extends Prop {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.FLOORTILE_BASIC);
    }

    protected load = (task: ContainerAssetTask) => {
        const entries: InstantiatedEntries = task.loadedContainer.instantiateModelsToScene();
        entries.rootNodes.forEach((node) => (node.parent = this.transform));
        this.transform.getChildMeshes().forEach((m) => {
            m.receiveShadows = true;
            m.checkCollisions = true;
        });
    };
}
