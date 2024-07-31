import * as animations from './animations';
import * as localEvents from './events';
import * as BABYLON from '@babylonjs/core';
import * as em from '../models/entity-manager.js';
import * as models from './models.js';
import { filter, skip, take, takeUntil, tap } from 'rxjs';

export const world = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager; events: localEvents.Events }) => {
    const { scene, entityManager, events } = props;
    createLights({ scene });
    const cockpit = createCockpit({ scene, entityManager, events });
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

const createCockpit = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager; events: localEvents.Events }) => {
    const { scene, entityManager, events } = props;
    const cockpit = models.cockpit({ scene, entityManager });
    cockpit.transform.position = new BABYLON.Vector3(-1, 0, 0);
    cockpit.transform.scaling = new BABYLON.Vector3(10, 10, 10);
    events.state$
        .pipe(
            filter((state) => state.type === 'launch'),
            take(1),
            tap(() => {
                const start = cockpit.transform.position;
                const end = new BABYLON.Vector3().addInPlace(start).add(new BABYLON.Vector3(0, 0, 10000));
                const animation = animations.engineStart({ start, end });
                cockpit.transform.animations = [animation];
                scene.beginAnimation(cockpit.transform, 0, 60, false, 1);
            }),
            takeUntil(events.destroy$),
        )
        .subscribe();
    return cockpit;
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
    const offset = 300;
    for (let i = 0; i < 20; i++) {
        create(new BABYLON.Vector3(30, 70, -100 + i * offset));
    }
};
