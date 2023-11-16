import { Vector3, Scene, TransformNode } from '@babylonjs/core';
import { World } from './world.js';
import { EntityManager } from '../managers/entity-manager.js';
import * as models from '../entities/model.js';

export class StartWorld extends World {
    constructor(scene: Scene, entityManager: EntityManager) {
        super(scene, entityManager);
        this.buildFloorAndRoof(scene, entityManager);
        this.buildWalls(scene, entityManager);
    }

    private buildWalls = (scene: Scene, entityManager: EntityManager) => {
        const wallParent = new TransformNode('wall', scene);
        const width = 10;
        for (let x = 0; x < width; x++) {
            const wall = models.windowWallSideB({ scene, entityManager });
            wall.transform.position = new Vector3(x * 4 - width * 2 + 1, 0, 20);
            wall.transform.parent = wallParent;
        }
    };

    private buildFloorAndRoof = (scene: Scene, entityManager: EntityManager) => {
        const roofParent = new TransformNode('roof', scene);
        const floorParent = new TransformNode('floor', scene);
        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                const floor = models.floorBasic1({ scene, entityManager });
                floor.transform.position = new Vector3(x * 2 - width, 0, z * 2 - height);
                floor.transform.parent = floorParent;
                const roof = models.roofEmpty({ scene, entityManager });
                roof.transform.position = new Vector3(x * 2 - width, 4, z * 2 - height);
                roof.transform.parent = roofParent;
            }
        }
    };
}
