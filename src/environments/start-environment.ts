import { Vector3 } from '@babylonjs/core';
import { Environment } from './environment.js';
import { FloorTileBasic } from '../props/floor.js';

export class StartEnvironment extends Environment {
    load = () => {
        const width = 10;
        const height = 100;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                const floor = new FloorTileBasic(x + ' ' + z, this.scene, this.entityManager);
                floor.transform.position = new Vector3(x * 2, 0, z * 2);
            }
        }
    };
}
