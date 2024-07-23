import * as BABYLON from '@babylonjs/core';
import * as em from '../models/entity-manager';
import * as models from '../models/models.js';

export const cantina = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'cantina',
        scene,
        entityManager,
        asset: { file: 'cantina_2k.glb', directory: 'assets/cantina/' },
    });
};
