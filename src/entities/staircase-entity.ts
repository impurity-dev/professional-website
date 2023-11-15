import * as assets from '../assets';
import { EntityManager } from '../managers/entity-manager';
import { Scene } from '@babylonjs/core';
import { AssetEntity } from './asset-entity';

export class StaircaseEntity extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.STAIRCASE);
    }
}
