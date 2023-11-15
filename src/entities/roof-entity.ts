import * as assets from '../assets';
import { EntityManager } from '../managers/entity-manager';
import { Scene, Vector3 } from '@babylonjs/core';
import { AssetEntity } from './asset-entity';

export class RoofTileCornerPipesEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_CORNER_PIPES);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTileDetailsEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_DETAILS);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTileEmptyEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_EMPTY);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTileInnerCornerPipesEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_INNERCORNER_PIPES);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTileOrangeVentEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_ORANGEVENT);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTilePipes1Entity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_PIPES1);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTilePipes2Entity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_PIPES2);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTilePlateEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_PLATE);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTilePlate2Entity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_PLATE2);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTileSidePipesEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_SIDES_PIPES);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTileSmallVentsEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_SMALLVENTS);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}

export class RoofTileVentsEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.ROOFTILE_VENTS);
        this.transform.rotation = new Vector3(0, 0, Math.PI);
    }
}
