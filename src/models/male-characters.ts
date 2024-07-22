import * as BABYLON from '@babylonjs/core';
import * as em from './entity-manager';
import * as models from './models.js';

const directory = 'assets/male-characters/';

export const adventurer = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-male-adventurer',
        scene,
        entityManager,
        asset: { file: 'Adventurer.gltf', directory },
    });
};

export const beach = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-beach',
        scene,
        entityManager,
        asset: { file: 'Beach.gltf', directory },
    });
};

export const casual = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-casual',
        scene,
        entityManager,
        asset: { file: 'Casual_2.gltf', directory },
    });
};

export const hoodie = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-casual-hoodie',
        scene,
        entityManager,
        asset: { file: 'Casual_Hoodie.gltf', directory },
    });
};

export const farmer = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-farmer',
        scene,
        entityManager,
        asset: { file: 'Farmer.gltf', directory },
    });
};

export const king = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-king',
        scene,
        entityManager,
        asset: { file: 'King.gltf', directory },
    });
};

export const punk = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-punk',
        scene,
        entityManager,
        asset: { file: 'Punk.gltf', directory },
    });
};

export const spacesuit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-spacesuit',
        scene,
        entityManager,
        asset: { file: 'Spacesuit.gltf', directory },
    });
};

export const suit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-suit',
        scene,
        entityManager,
        asset: { file: 'Suit.gltf', directory },
    });
};

export const swat = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-swat',
        scene,
        entityManager,
        asset: { file: 'Swat.gltf', directory },
    });
};

export const worker = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-worker',
        scene,
        entityManager,
        asset: { file: 'Worker.gltf', directory },
    });
};
