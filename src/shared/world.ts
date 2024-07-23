import { Scene } from '@babylonjs/core';
import { EntityManager } from '../models/entity-manager';

export abstract class World {
    constructor(
        protected readonly scene: Scene,
        protected readonly entityManager: EntityManager,
    ) {}
}
