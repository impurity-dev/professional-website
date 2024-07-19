import * as BABYLON from '@babylonjs/core';
import * as em from '../managers/entity-manager.js';
import { World } from '../shared/world.js';
import * as models from './models.js';

export class LaunchWorld extends World {
    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) {
        const { scene, entityManager } = props;
        super(scene, entityManager);
        this.lights({ scene });
        this.cockpit({ scene, entityManager });
        this.corridor({ scene, entityManager });
    }

    private lights = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), scene);
        light.intensity = 0.3;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };

    private cockpit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
        const { scene, entityManager } = props;
        const model = models.cockpit({ scene, entityManager });
        model.transform.position = new BABYLON.Vector3(0, 0, 0);
        model.transform.scaling = new BABYLON.Vector3(10, 10, 10);
        model.onLoad.subscribe(() => {
            model.flickerMonitorsAsync();
            model.changeThrottleAsync(Math.PI / 4);
            model.changeSteeringAsync(Math.PI / 4);
        });
    };

    private corridor = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
        const { scene, entityManager } = props;
        const create = (position: BABYLON.Vector3) => {
            const model = models.corridor({ scene, entityManager });
            model.transform.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
            model.transform.scaling = new BABYLON.Vector3(10, 10, 10);
            model.transform.position = position;
            return model;
        };
        create(new BABYLON.Vector3(0, 10, -40));
        create(new BABYLON.Vector3(0, 10, 42));
        create(new BABYLON.Vector3(0, 10, 124));
        create(new BABYLON.Vector3(0, 10, 206));
    };
}
