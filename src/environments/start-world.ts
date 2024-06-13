import { Vector3, Scene, TransformNode } from '@babylonjs/core';
import { World } from './world.js';
import { EntityManager } from '../managers/entity-manager.js';
import * as models from '../entities/model.js';

export class StartWorld extends World {
    constructor(scene: Scene, entityManager: EntityManager) {
        super(scene, entityManager);
        this.floors();
        this.walls();
        this.windows();
        this.stairs();
    }

    private stairs = () => {
        const parent = new TransformNode('stairs', this.scene);
        const rotation = new Vector3(0, Math.PI / 2, 0);
        this.put({ model: models.staircase, position: new Vector3(5, 1, 0), rotation, parent });
        this.put({ model: models.staircase, position: new Vector3(6, 2, 0), rotation, parent });
    };

    private walls = () => {
        const parent = new TransformNode('walls', this.scene);
        let rotation = new Vector3(0, Math.PI, 0);
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(-10, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(-6, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(-2, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(0, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(4, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.column1, pipes: models.pipes }), position: new Vector3(8, 0, 9), rotation, parent });

        rotation = new Vector3(0, -Math.PI / 2, 0);
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(9, 0, 8), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(9, 0, 4), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(9, 0, 0), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(9, 0, -2), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(9, 0, -6), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.column1, pipes: models.pipes }), position: new Vector3(9, 0, -10), rotation, parent });

        rotation = Vector3.Zero();
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(8, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(4, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(0, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(-2, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(-6, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.column1, pipes: models.pipes }), position: new Vector3(-10, 0, -11), rotation, parent });

        rotation = new Vector3(0, Math.PI / 2, 0);
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(-11, 0, -10), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(-11, 0, -6), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(-11, 0, -2), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(-11, 0, 0), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new Vector3(-11, 0, 4), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.column1, pipes: models.pipes }), position: new Vector3(-11, 0, 8), rotation, parent });
    };

    private windows = () => {
        const parent = new TransformNode('windows', this.scene);
        const model = models.windowWall({ pole: models.columnSlim, pipes: models.pipes });
        let rotation = Vector3.Zero();
        this.put({ model, position: new Vector3(-8, 0, 9), rotation, parent });
        this.put({ model, position: new Vector3(-4, 0, 9), rotation, parent });
        this.put({ model, position: new Vector3(2, 0, 9), rotation, parent });
        this.put({ model, position: new Vector3(6, 0, 9), rotation, parent });

        rotation = new Vector3(0, Math.PI / 2, 0);
        this.put({ model, position: new Vector3(9, 0, 6), rotation, parent });
        this.put({ model, position: new Vector3(9, 0, 2), rotation, parent });
        this.put({ model, position: new Vector3(9, 0, -4), rotation, parent });
        this.put({ model, position: new Vector3(9, 0, -8), rotation, parent });

        rotation = new Vector3(0, Math.PI, 0);
        this.put({ model, position: new Vector3(6, 0, -11), rotation, parent });
        this.put({ model, position: new Vector3(2, 0, -11), rotation, parent });
        this.put({ model, position: new Vector3(-4, 0, -11), rotation, parent });
        this.put({ model, position: new Vector3(-8, 0, -11), rotation, parent });

        rotation = new Vector3(0, -Math.PI / 2, 0);
        this.put({ model, position: new Vector3(-11, 0, -8), rotation, parent });
        this.put({ model, position: new Vector3(-11, 0, -4), rotation, parent });
        this.put({ model, position: new Vector3(-11, 0, 2), rotation, parent });
        this.put({ model, position: new Vector3(-11, 0, 6), rotation, parent });
    };

    private floors = () => {
        const parent = new TransformNode('floors', this.scene);
        const rotation = Vector3.Zero();
        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                this.put({ model: models.floorBasic1, position: new Vector3(x - width / 2 - 0.5, 0, z - height / 2 - 0.5), rotation, parent });
            }
        }
    };

    private put = (config: { model: models.EntityFactory; position: Vector3; rotation: Vector3; parent?: TransformNode }) => {
        const { scene, entityManager } = this;
        const { model, position, rotation, parent } = config;
        const tile = model({ scene, entityManager });
        const offsetX = 1;
        const scaleX = 2;
        const offsetY = 0;
        const scaleY = 1;
        const offsetZ = 1;
        const scaleZ = 2;
        tile.transform.position = new Vector3(position.x * scaleX + offsetX, position.y * scaleY + offsetY, position.z * scaleZ + offsetZ);
        tile.transform.rotation = rotation;
        tile.transform.parent = parent;
    };
}
