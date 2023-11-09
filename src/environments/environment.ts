import { Scene } from '@babylonjs/core';
import { EntityManager } from '../managers/entity-manager';

export abstract class Environment {
    constructor(
        protected readonly scene: Scene,
        protected readonly entityManager: EntityManager,
    ) {}

    abstract load(): void;
}
