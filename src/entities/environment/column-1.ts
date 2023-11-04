import { AbstractMesh, MeshAssetTask, Scene, TransformNode } from '@babylonjs/core';
import { EntityManager } from '../../managers/entity-manager';
import { COLUMN_1 } from '../../assets/environment';

export class Column1Entity {
    constructor(
        readonly id: string,
        readonly scene: Scene,
        readonly entityManager: EntityManager,
    ) {
        entityManager.queue(COLUMN_1);
    }
}
