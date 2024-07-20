import * as BABYLON from '@babylonjs/core';
import * as em from '../managers/entity-manager.js';
import * as models from '../shared/models.js';
import { World } from '../shared/world.js';
import { Carosel } from './carosels.js';
import * as events from './events.js';

export class CreditsWorld extends World {
    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager; event: events.Events }) {
        const { scene, entityManager, event } = props;
        super(scene, entityManager);
        this.lights({ scene });
        this.chamber({ scene, entityManager });
        this.items({ scene });
        this.carosel({ scene, entityManager, event });
    }

    private items = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const box = BABYLON.CreateBox('box', { size: 1 }, scene);
        box.position = BABYLON.Vector3.Zero();
    };

    private lights = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), scene);
        light.intensity = 0.3;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };

    private chamber = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
        const { scene, entityManager } = props;
        const model = new models.Model({
            name: 'chamber',
            scene,
            entityManager,
            asset: { file: 'chamber_1k.glb', directory: 'assets/chamber/' },
        });
        model.transform.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        model.transform.position = new BABYLON.Vector3(0, -10, -31.5);
        return model;
    };

    private carosel = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager; event: events.Events }) => {
        const { scene, entityManager, event } = props;
        return new Carosel({ scene, entityManager, event });
    };
}
