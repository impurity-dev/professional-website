import * as particles from './particles';
import * as localEvents from './events';
import * as BABYLON from '@babylonjs/core';
import * as em from '../models/entity-manager.js';
import * as models from './models.js';
import { delay, filter, merge, mergeMap, take, takeUntil, tap } from 'rxjs';

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
    cockpit.onLoad
        .pipe(
            take(1),
            tap(() => {
                cockpit.monitors.visibility = 0;
            }),
        )
        .subscribe();
    events.state$
        .pipe(
            filter((state) => state.type === 'monitors'),
            take(1),
            mergeMap(() => merge(cockpit.flickerMonitors$(), cockpit.flickerLights$())),
            delay(5_000),
            tap(() => events.state$.next({ type: 'engines' })),
            takeUntil(events.destroy$),
        )
        .subscribe();
    events.state$
        .pipe(
            filter((state) => state.type === 'engines'),
            take(1),
            mergeMap(() => cockpit.engineStart$()),
            delay(5_000),
            tap(() => events.state$.next({ type: 'launch' })),
            takeUntil(events.destroy$),
        )
        .subscribe();
    const warpspeed = particles.warpspeed({
        scene,
        radius: 50,
        height: 50,
        parent: cockpit.transform,
        position: new BABYLON.Vector3(0, 0, 400),
    });
    events.state$
        .pipe(
            filter((state) => state.type === 'launch'),
            take(1),
            mergeMap(() => cockpit.changeThrottle$(Math.PI / 4)),
            tap(() => warpspeed.start()),
            mergeMap(() => cockpit.launch$(new BABYLON.Vector3(0, 0, 10000))),
            tap(() => events.state$.next({ type: 'space' })),
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
    for (let i = 0; i < 30; i++) {
        create(new BABYLON.Vector3(30, 70, -100 + i * offset));
    }
};
