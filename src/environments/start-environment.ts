import * as assets from '../assets';
import { Vector3, TransformNode } from '@babylonjs/core';
import { Environment } from './environment.js';

export class StartEnvironment extends Environment {
    load = async () => {
        this.entityManager.queue(assets.FLOORTILE_BASIC);
        this.entityManager.queue(assets.ROOFTILE_EMPTY);
        this.entityManager.queue(assets.WALLS__WINDOW_WALL_SIDEA);
        this.entityManager.queue(assets.WALLS__WINDOW_WALL_SIDEB);
        await this.entityManager.load();

        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                const floor = this.floor();
                floor.position = new Vector3(x * 2, 0, z * 2);
                const roof = this.roof();
                roof.position = new Vector3(x * 2, 4.5, z * 2);
                roof.rotation = new Vector3(Math.PI, 0, 0);
            }
        }

        for (let x = 0; x < width / 2; x++) {
            const wall = this.windowWall();
            wall.position = new Vector3(x * 4 + 1, 0, 0);
        }

        for (let x = 0; x < width / 2; x++) {
            const wall = this.windowWall();
            wall.rotation.y = Math.PI / 2;
            wall.position = new Vector3(0, 0, x * 4 + 1);
        }
    };

    private roof = () => {
        const roof = this.entityManager.get(assets.ROOFTILE_EMPTY);
        roof.getChildMeshes().forEach((m) => {
            m.receiveShadows = true;
            m.checkCollisions = true;
        });
        return roof;
    };

    private floor = () => {
        const floor = this.entityManager.get(assets.FLOORTILE_BASIC);
        floor.getChildMeshes().forEach((m) => {
            m.receiveShadows = true;
            m.checkCollisions = true;
        });
        return floor;
    };

    private windowWall = () => {
        const windowA = this.entityManager.get(assets.WALLS__WINDOW_WALL_SIDEA);
        windowA.getChildMeshes().forEach((m) => {
            m.receiveShadows = true;
            m.checkCollisions = true;
        });
        const windowB = this.entityManager.get(assets.WALLS__WINDOW_WALL_SIDEB);
        windowB.getChildMeshes().forEach((m) => {
            m.receiveShadows = true;
            m.checkCollisions = true;
        });
        windowB.position.z = -1;
        windowB.rotation.y = Math.PI;
        const parent = new TransformNode('WindowWall', this.scene);
        windowA.parent = parent;
        windowB.parent = parent;
        return parent;
    };
}
