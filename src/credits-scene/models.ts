import * as BABYLON from '@babylonjs/core';
import * as em from '../managers/entity-manager';
import * as models from '../shared/models.js';

export const cockpit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    const cockpitModel = new models.Model({
        name: 'cockpit',
        scene,
        entityManager,
        asset: { file: 'cockpit_4k.glb', directory: 'assets/cockpit/' },
    });
    return cockpitModel;
};

export const corridor = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'corridor',
        scene,
        entityManager,
        asset: { file: 'corridor_4k.glb', directory: 'assets/corridor/' },
    });
};
