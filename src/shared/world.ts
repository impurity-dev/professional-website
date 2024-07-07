import { Scene } from '@babylonjs/core';
import { EntityManager } from '../globals/entity-manager';

export abstract class World {
    constructor(
        protected readonly scene: Scene,
        protected readonly entityManager: EntityManager,
    ) {}
}
