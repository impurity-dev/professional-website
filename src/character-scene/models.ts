import * as BABYLON from '@babylonjs/core';
import * as em from '../managers/entity-manager';
import * as models from '../shared/models.js';

export const worker = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'worker',
        scene,
        entityManager,
        asset: { file: 'worker.gltf', directory: 'assets/male-characters/' },
    });
};

export const swat = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'swat',
        scene,
        entityManager,
        asset: { file: 'swat.gltf', directory: 'assets/male-characters/' },
    });
};
