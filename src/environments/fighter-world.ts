import * as BABYLON from '@babylonjs/core';
import * as models from '../entities/model';
import { EntityManager } from '../managers/entity-manager';
import { World } from './world';

export class FighterWorld extends World {
    public readonly fighter: models.Model;
    public readonly onLaunchOptions: BABYLON.Observable<boolean> = new BABYLON.Observable();

    constructor(scene: BABYLON.Scene, entityManager: EntityManager) {
        super(scene, entityManager);
        this.fighter = this.ship();
    }

    private ship = () => {
        const { scene, entityManager } = this;
        const fighter = new models.Model({
            name: 'fighter',
            scene,
            entityManager,
            asset: { file: 'fighter.glb', directory: 'assets/fighter/' },
        });
        return fighter;
    };
}
