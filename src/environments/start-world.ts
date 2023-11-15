import { Vector3, Scene } from '@babylonjs/core';
import { World } from './world.js';
import { EntityManager } from '../managers/entity-manager.js';
import { FloorTileBasicEntity } from '../entities/floor-entity.js';
import { RoofTileEmptyEntity } from '../entities/roof-entity.js';
import { DoorDoubleWallSide } from '../entities/wall-entity.js';

export class StartWorld extends World {
    constructor(scene: Scene, entityManager: EntityManager) {
        super(scene, entityManager);
        this.buildFloorAndRoof();
        this.buildWalls();
    }

    private buildWalls = () => {
        const wall = new DoorDoubleWallSide(`wall`, this.scene, this.entityManager);
    };

    private buildFloorAndRoof = () => {
        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                const floor = new FloorTileBasicEntity(`floor-${x}-${z}`, this.scene, this.entityManager);
                floor.transform.position = new Vector3(x * 2 - width, 0, z * 2 - height);
                const roof = new RoofTileEmptyEntity(`roof-${x}-${z}`, this.scene, this.entityManager);
                roof.transform.position = new Vector3(x * 2 - width, 4, z * 2 - height);
            }
        }
    };
}
