import * as BABYLON from '@babylonjs/core';
import * as em from '../managers/entity-manager';
import * as models from '../shared/models.js';

const directory = 'assets/female-characters/';

export const adventurer = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-adventurer',
        scene,
        entityManager,
        asset: { file: 'Adventurer.gltf', directory },
    });
};

export const casual = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-casual',
        scene,
        entityManager,
        asset: { file: 'Casual.gltf', directory },
    });
};

export const formal = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-formal',
        scene,
        entityManager,
        asset: { file: 'Formal.gltf', directory },
    });
};

export const medieval = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-medieval',
        scene,
        entityManager,
        asset: { file: 'Medieval.gltf', directory },
    });
};

export const punk = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-punk',
        scene,
        entityManager,
        asset: { file: 'Punk.gltf', directory },
    });
};

export const sciFi = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-scifi',
        scene,
        entityManager,
        asset: { file: 'SciFi.gltf', directory },
    });
};

export const soldier = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-soldier',
        scene,
        entityManager,
        asset: { file: 'Soldier.gltf', directory },
    });
};

export const suit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-suit',
        scene,
        entityManager,
        asset: { file: 'Suit.gltf', directory },
    });
};

export const witch = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-witch',
        scene,
        entityManager,
        asset: { file: 'Witch.gltf', directory },
    });
};

export const worker = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-worker',
        scene,
        entityManager,
        asset: { file: 'Worker.gltf', directory },
    });
};
