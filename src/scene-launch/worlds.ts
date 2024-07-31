import * as localEvents from './events';
import * as BABYLON from '@babylonjs/core';
import * as em from '../models/entity-manager.js';
import * as models from './models.js';

export const world = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager; events: localEvents.Events }) => {
    const { scene, entityManager, events } = props;
    createLights({ scene });
    const cockpit = createCockpit({ scene, entityManager });
    createCorridor({ scene, entityManager });
    return {
        cockpit,
    };
};

const createLights = (props: { scene: BABYLON.Scene }) => {
    const { scene } = props;
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), scene);
    light.intensity = 0.3;
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
};

const createCockpit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    const model = models.cockpit({ scene, entityManager });
    model.transform.position = new BABYLON.Vector3(0, 0, 0);
    model.transform.scaling = new BABYLON.Vector3(10, 10, 10);
    return model;
};

const createCorridor = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
    const { scene, entityManager } = props;
    const create = (position: BABYLON.Vector3) => {
        const model = models.skyCorridor({ scene, entityManager });
        model.transform.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
        model.transform.scaling = new BABYLON.Vector3(100, 100, 100);
        model.transform.position = position;
        return model;
    };
    create(new BABYLON.Vector3(30, 70, -100));
    create(new BABYLON.Vector3(30, 70, 200));
    create(new BABYLON.Vector3(30, 70, 500));
    create(new BABYLON.Vector3(30, 70, 800));
};
