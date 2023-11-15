import * as assets from '../assets';
import { EntityManager } from '../managers/entity-manager';
import { Scene } from '@babylonjs/core';
import { AssetEntity } from './asset-entity';

export class Column1Entity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.COLUMN_1);
    }
}

export class Column2Entity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.COLUMN_2);
    }
}

export class Column3Entity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.COLUMN_3);
    }
}

export class ColumnSlimEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.COLUMN_SLIM);
    }
}
