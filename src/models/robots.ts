import * as BABYLON from '@babylonjs/core';
import * as em from './entity-manager.js';
import * as models from './models.js';

const directory = 'assets/robots/';

export const george = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'robot-george',
        scene,
        entityManager,
        asset: { file: 'George.gltf', directory },
    });
};

export const leela = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'robot-leela',
        scene,
        entityManager,
        asset: { file: 'Leela.gltf', directory },
    });
};

export const mike = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'robot-mike',
        scene,
        entityManager,
        asset: { file: 'Mike.gltf', directory },
    });
};

export const stan = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'robot-stan',
        scene,
        entityManager,
        asset: { file: 'Stan.gltf', directory },
    });
};
