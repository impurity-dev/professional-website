import * as assets from '../assets';
import { EntityManager } from '../managers/entity-manager';
import { Scene } from '@babylonjs/core';
import { AssetEntity } from './asset-entity';

export class PropBaseEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_BASE);
    }
}

export class PropCapsuleEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_CAPSULE);
    }
}

export class PropChestEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_CHEST);
    }
}

export class PropComputerEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_COMPUTER);
    }
}

export class PropComputerSmallEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_COMPUTERSMALL);
    }
}

export class PropContainerFullEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_CONTAINERFULL);
    }
}

export class PropCrateEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_CRATE);
    }
}

export class PropCrateLongEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_CRATELONG);
    }
}

export class PropLaserEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_LASER);
    }
}

export class PropPodEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_POD);
    }
}

export class PropShelfEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_SHELF);
    }
}

export class PropShelfTallEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_SHELF_TALL);
    }
}

export class PropStatueEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_STATUE);
    }
}

export class PropTeleporter1Entity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_TELEPORTER_1);
    }
}

export class PropTeleporter2Entity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_TELEPORTER_2);
    }
}

export class PropVesselEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_VESSEL);
    }
}

export class PropVesselShortEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_VESSEL_SHORT);
    }
}

export class PropVesselTallEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.PROPS_VESSEL_TALL);
    }
}
