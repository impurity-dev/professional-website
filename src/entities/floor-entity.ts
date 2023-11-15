import * as assets from '../assets';
import { EntityManager } from '../managers/entity-manager';
import { Scene } from '@babylonjs/core';
import { AssetEntity } from './asset-entity';

export class FloorTileBasicEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.FLOORTILE_BASIC);
    }
}

export class FloorTileBasic2Entity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.FLOORTILE_BASIC2);
    }
}

export class FloorTileCornerEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.FLOORTILE_CORNER);
    }
}

export class FloorTileDoubleHallwayEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.FLOORTILE_DOUBLE_HALLWAY);
    }
}

export class FloorTileEmptyEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.FLOORTILE_EMPTY);
    }
}

export class FloorTileInnerCornerEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.FLOORTILE_INNERCORNER);
    }
}

export class FloorTileSideEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.FLOORTILE_SIDE);
    }
}
