import * as BABYLON from '@babylonjs/core';
import * as em from './entity-manager.js';
import * as models from './models.js';

const femaleDirectory = 'assets/female-characters/';
const maleDirectory = 'assets/male-characters/';

export const femaleAdventurer = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-adventurer',
        scene,
        entityManager,
        asset: { file: 'Adventurer.gltf', directory: femaleDirectory },
    });
};

export const femaleCasual = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-casual',
        scene,
        entityManager,
        asset: { file: 'Casual.gltf', directory: femaleDirectory },
    });
};

export const femaleFormal = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-formal',
        scene,
        entityManager,
        asset: { file: 'Formal.gltf', directory: femaleDirectory },
    });
};

export const femaleMedieval = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-medieval',
        scene,
        entityManager,
        asset: { file: 'Medieval.gltf', directory: femaleDirectory },
    });
};

export const femalePunk = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-punk',
        scene,
        entityManager,
        asset: { file: 'Punk.gltf', directory: femaleDirectory },
    });
};

export const femaleSciFi = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-scifi',
        scene,
        entityManager,
        asset: { file: 'SciFi.gltf', directory: femaleDirectory },
    });
};

export const femaleSoldier = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-soldier',
        scene,
        entityManager,
        asset: { file: 'Soldier.gltf', directory: femaleDirectory },
    });
};

export const femaleSuit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-suit',
        scene,
        entityManager,
        asset: { file: 'Suit.gltf', directory: femaleDirectory },
    });
};

export const femaleWitch = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-witch',
        scene,
        entityManager,
        asset: { file: 'Witch.gltf', directory: femaleDirectory },
    });
};

export const femaleWorker = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-worker',
        scene,
        entityManager,
        asset: { file: 'Worker.gltf', directory: femaleDirectory },
    });
};

export const maleAdventurer = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-male-adventurer',
        scene,
        entityManager,
        asset: { file: 'Adventurer.gltf', directory: maleDirectory },
    });
};

export const maleBeach = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-beach',
        scene,
        entityManager,
        asset: { file: 'Beach.gltf', directory: maleDirectory },
    });
};

export const maleCasual = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-casual',
        scene,
        entityManager,
        asset: { file: 'Casual_2.gltf', directory: maleDirectory },
    });
};

export const maleHoodie = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-casual-hoodie',
        scene,
        entityManager,
        asset: { file: 'Casual_Hoodie.gltf', directory: maleDirectory },
    });
};

export const maleFarmer = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-farmer',
        scene,
        entityManager,
        asset: { file: 'Farmer.gltf', directory: maleDirectory },
    });
};

export const maleKing = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-king',
        scene,
        entityManager,
        asset: { file: 'King.gltf', directory: maleDirectory },
    });
};

export const malePunk = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-punk',
        scene,
        entityManager,
        asset: { file: 'Punk.gltf', directory: maleDirectory },
    });
};

export const maleSpacesuit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-spacesuit',
        scene,
        entityManager,
        asset: { file: 'Spacesuit.gltf', directory: maleDirectory },
    });
};

export const maleSuit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-suit',
        scene,
        entityManager,
        asset: { file: 'Suit.gltf', directory: maleDirectory },
    });
};

export const maleSwat = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-swat',
        scene,
        entityManager,
        asset: { file: 'Swat.gltf', directory: maleDirectory },
    });
};

export const maleWorker = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-worker',
        scene,
        entityManager,
        asset: { file: 'Worker.gltf', directory: maleDirectory },
    });
};
