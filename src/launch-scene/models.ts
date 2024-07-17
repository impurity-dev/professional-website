import * as BABYLON from '@babylonjs/core';
import * as models from '../shared/models.js';
import * as em from '../managers/entity-manager';

export const cockpit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    const cockpitModel = new models.Model({
        name: 'cockpit',
        scene,
        entityManager,
        asset: { file: 'cockpit_4k.glb', directory: 'assets/cockpit/' },
    });
    cockpitModel.transform.scaling = new BABYLON.Vector3(10, 10, 10);
    return cockpitModel;
};
