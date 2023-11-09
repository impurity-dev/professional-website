import * as assets from '../assets';
import { EntityManager } from '../managers/entity-manager';
import { Scene, ContainerAssetTask, InstantiatedEntries } from '@babylonjs/core';
import { Prop } from './prop';

export class Column1Prop extends Prop {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.COLUMN_1);
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

export class Column2Prop extends Prop {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.COLUMN_2);
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

export class Column3Prop extends Prop {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.COLUMN_3);
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

export class ColumnSlim extends Prop {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.COLUMN_SLIM);
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
