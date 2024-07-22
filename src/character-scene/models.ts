import * as BABYLON from '@babylonjs/core';
import * as em from '../managers/entity-manager';
import * as models from '../shared/models.js';

export const station = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-male-adventurer',
        scene,
        entityManager,
        asset: { file: 'station_2k.glb', directory: 'assets/cyberpunk-station/' },
    });
};

export const maleAdventurer = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-male-adventurer',
        scene,
        entityManager,
        asset: { file: 'Adventurer.gltf', directory: 'assets/male-characters/' },
    });
};

export const maleBeach = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-beach',
        scene,
        entityManager,
        asset: { file: 'Beach.gltf', directory: 'assets/male-characters/' },
    });
};

export const maleCasual = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-casual',
        scene,
        entityManager,
        asset: { file: 'Casual_2.gltf', directory: 'assets/male-characters/' },
    });
};

export const maleHoodie = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-casual-hoodie',
        scene,
        entityManager,
        asset: { file: 'Casual_Hoodie.gltf', directory: 'assets/male-characters/' },
    });
};

export const maleFarmer = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-farmer',
        scene,
        entityManager,
        asset: { file: 'Farmer.gltf', directory: 'assets/male-characters/' },
    });
};

export const maleKing = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-king',
        scene,
        entityManager,
        asset: { file: 'King.gltf', directory: 'assets/male-characters/' },
    });
};

export const malePunk = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-punk',
        scene,
        entityManager,
        asset: { file: 'Punk.gltf', directory: 'assets/male-characters/' },
    });
};

export const maleSpacesuit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-spacesuit',
        scene,
        entityManager,
        asset: { file: 'Spacesuit.gltf', directory: 'assets/male-characters/' },
    });
};

export const maleSuit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-suit',
        scene,
        entityManager,
        asset: { file: 'Suit.gltf', directory: 'assets/male-characters/' },
    });
};

export const maleSwat = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-swat',
        scene,
        entityManager,
        asset: { file: 'Swat.gltf', directory: 'assets/male-characters/' },
    });
};

export const maleWorker = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-worker',
        scene,
        entityManager,
        asset: { file: 'Worker.gltf', directory: 'assets/male-characters/' },
    });
};

export const femaleAdventurer = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-adventurer',
        scene,
        entityManager,
        asset: { file: 'Adventurer.gltf', directory: 'assets/female-characters/' },
    });
};

export const femaleCasual = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-casual',
        scene,
        entityManager,
        asset: { file: 'Casual.gltf', directory: 'assets/female-characters/' },
    });
};

export const femaleFormal = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-formal',
        scene,
        entityManager,
        asset: { file: 'Formal.gltf', directory: 'assets/female-characters/' },
    });
};

export const femaleMedieval = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-medieval',
        scene,
        entityManager,
        asset: { file: 'Medieval.gltf', directory: 'assets/female-characters/' },
    });
};

export const femalePunk = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-punk',
        scene,
        entityManager,
        asset: { file: 'Punk.gltf', directory: 'assets/female-characters/' },
    });
};

export const femaleSciFi = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-scifi',
        scene,
        entityManager,
        asset: { file: 'SciFi.gltf', directory: 'assets/female-characters/' },
    });
};

export const femaleSoldier = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-soldier',
        scene,
        entityManager,
        asset: { file: 'Soldier.gltf', directory: 'assets/female-characters/' },
    });
};

export const femaleSuit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-suit',
        scene,
        entityManager,
        asset: { file: 'Suit.gltf', directory: 'assets/female-characters/' },
    });
};

export const femaleWitch = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-witch',
        scene,
        entityManager,
        asset: { file: 'Witch.gltf', directory: 'assets/female-characters/' },
    });
};

export const femaleWorker = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'female-worker',
        scene,
        entityManager,
        asset: { file: 'Worker.gltf', directory: 'assets/female-characters/' },
    });
};
