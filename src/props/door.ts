import * as assets from '../assets';
import { EntityManager } from '../managers/entity-manager';
import { Scene, ContainerAssetTask, InstantiatedEntries } from '@babylonjs/core';
import { Prop } from './prop';

export class DoorDoubleProp extends Prop {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.DOOR_DOUBLE);
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

export class DoorSingleProp extends Prop {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.DOOR_SINGLE);
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
