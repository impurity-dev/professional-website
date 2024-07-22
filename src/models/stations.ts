import * as BABYLON from '@babylonjs/core';
import * as em from './entity-manager';
import * as models from './models.js';

export const station = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    return new models.Model({
        name: 'male-male-adventurer',
        scene,
        entityManager,
        asset: { file: 'station_2k.glb', directory: 'assets/cyberpunk-station/' },
    });
};
