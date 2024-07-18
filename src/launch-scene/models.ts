import * as BABYLON from '@babylonjs/core';
import * as models from '../shared/models.js';
import * as em from '../managers/entity-manager';

export const cockpit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new Cockpit({ scene, entityManager });
};

export const corridor = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    const cockpitModel = new models.Model({
        name: 'corridor',
        scene,
        entityManager,
        asset: { file: 'corridor_4k.glb', directory: 'assets/corridor/' },
    });
    cockpitModel.onLoad.subscribe(() => {
        cockpitModel.transform.getChildTransformNodes().forEach((t) => {
            if (t.name === 'Stars-Space_4') t.dispose();
        });
    });
    return cockpitModel;
};

export class Cockpit {
    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) {
        const { scene, entityManager } = props;
        const model = new models.Model({
            name: 'cockpit',
            scene,
            entityManager,
            asset: { file: 'cockpit_4k.glb', directory: 'assets/cockpit/' },
        });
    }
}
