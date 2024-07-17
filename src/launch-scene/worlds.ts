import * as BABYLON from '@babylonjs/core';
import { EntityManager } from '../managers/entity-manager.js';
import { World } from '../shared/world.js';

export class LaunchWorld extends World {
    constructor(props: { scene: BABYLON.Scene; entityManager: EntityManager }) {
        const { scene, entityManager } = props;
        super(scene, entityManager);
    }
}
