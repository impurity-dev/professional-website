import { MeshBuilder, Vector3 } from '@babylonjs/core';
import { Environment } from './environment.js';
import { FloorTileBasic } from '../props/floor.js';

export class StartEnvironment extends Environment {
    load = () => {
        this.buildFloorAndRoof();
    };

    private buildFloorAndRoof = () => {
        const width = 15;
        const height = 15;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                const position = new Vector3(x * 2 - width, 0, z * 2 - height);
                const floor = new FloorTileBasic(`floor-${position}`, this.scene, this.entityManager);
                floor.transform.position = position;
                // const floor = MeshBuilder.CreateBox(`floor-${position}`, { size: 2 }, this.scene);
                // floor.position = position;
                // floor.checkCollisions = true;
            }
        }
    };
}
