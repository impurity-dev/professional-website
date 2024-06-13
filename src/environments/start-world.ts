import * as BABYLON from '@babylonjs/core';
import { World } from './world.js';
import { EntityManager } from '../managers/entity-manager.js';
import * as models from '../entities/model.js';

export class StartWorld extends World {
    constructor(scene: BABYLON.Scene, entityManager: EntityManager) {
        super(scene, entityManager);
        this.floors();
        this.roof();
        // this.floor2();
        this.walls();
        this.windows();
        // this.stairs();
    }

    private floor2 = () => {
        const parent = new BABYLON.TransformNode('floor-2', this.scene);
        const rotation = BABYLON.Vector3.Zero();
        this.put({ model: models.floorBasic1, position: new BABYLON.Vector3(0, 4, 8.5), rotation, parent });
        this.put({ model: models.floorBasic1, position: new BABYLON.Vector3(0, 4, 7.5), rotation, parent });
    };

    private stairs = () => {
        const parent = new BABYLON.TransformNode('stairs', this.scene);
        const rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        this.put({ model: models.staircase, position: new BABYLON.Vector3(5, 1, 8), rotation, parent });
        this.put({ model: models.staircase, position: new BABYLON.Vector3(3.5, 2, 8), rotation, parent });
        this.put({ model: models.staircase, position: new BABYLON.Vector3(2, 3, 8), rotation, parent });
        this.put({ model: models.staircase, position: new BABYLON.Vector3(0.5, 4, 8), rotation, parent });
        this.put({ model: models.staircase, position: new BABYLON.Vector3(-1, 5, 8), rotation, parent });
    };

    private walls = () => {
        const parent = new BABYLON.TransformNode('walls', this.scene);
        let rotation = new BABYLON.Vector3(0, Math.PI, 0);
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-10, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-6, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-2, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(0, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(4, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.column1, pipes: models.pipes }), position: new BABYLON.Vector3(8, 0, 9), rotation, parent });

        rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, 8), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, 4), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, 0), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, -2), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, -6), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.column1, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, -10), rotation, parent });

        rotation = BABYLON.Vector3.Zero();
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(8, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(4, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(0, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-2, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-6, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.column1, pipes: models.pipes }), position: new BABYLON.Vector3(-10, 0, -11), rotation, parent });

        rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, -10), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, -6), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, -2), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, 0), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, 4), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.column1, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, 8), rotation, parent });
    };

    private windows = () => {
        const parent = new BABYLON.TransformNode('windows', this.scene);
        const model = models.windowWall({ pole: models.columnSlim, pipes: models.pipes });
        let rotation = BABYLON.Vector3.Zero();
        this.put({ model, position: new BABYLON.Vector3(-8, 0, 9), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-4, 0, 9), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(2, 0, 9), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(6, 0, 9), rotation, parent });

        rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        this.put({ model, position: new BABYLON.Vector3(9, 0, 6), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(9, 0, 2), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(9, 0, -4), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(9, 0, -8), rotation, parent });

        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        this.put({ model, position: new BABYLON.Vector3(6, 0, -11), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(2, 0, -11), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-4, 0, -11), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-8, 0, -11), rotation, parent });

        rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
        this.put({ model, position: new BABYLON.Vector3(-11, 0, -8), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-11, 0, -4), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-11, 0, 2), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-11, 0, 6), rotation, parent });
    };

    private floors = () => {
        const parent = new BABYLON.TransformNode('floors', this.scene);
        const rotation = BABYLON.Vector3.Zero();
        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                this.put({ model: models.floorBasic1, position: new BABYLON.Vector3(x - width / 2 - 0.5, 0, z - height / 2 - 0.5), rotation, parent });
            }
        }
    };

    private roof = () => {
        const parent = new BABYLON.TransformNode('roof', this.scene);
        const rotation = new BABYLON.Vector3(0, Math.PI, 0);
        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                this.put({ model: models.roofEmpty, position: new BABYLON.Vector3(x - width / 2 - 0.5, 4.5, z - height / 2 - 0.5), rotation, parent });
            }
        }
    };

    private put = (config: { model: models.EntityFactory; position: BABYLON.Vector3; rotation: BABYLON.Vector3; parent?: BABYLON.TransformNode }) => {
        const { scene, entityManager } = this;
        const { model, position, rotation, parent } = config;
        const tile = model({ scene, entityManager });
        const offsetX = 1;
        const scaleX = 2;
        const offsetY = 0;
        const scaleY = 1;
        const offsetZ = 1;
        const scaleZ = 2;
        tile.transform.position = new BABYLON.Vector3(position.x * scaleX + offsetX, position.y * scaleY + offsetY, position.z * scaleZ + offsetZ);
        tile.transform.rotation = rotation;
        tile.transform.parent = parent;
    };
}
