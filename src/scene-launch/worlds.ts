import * as assets from './assets';
import * as particles from './particles';
import * as localEvents from './events';
import * as BABYLON from '@babylonjs/core';
import { delay, filter, merge, mergeMap, take, takeUntil, tap } from 'rxjs';
import { AssetFactory } from '../managers/asset-factory';

export const world = (props: { events: localEvents.Events; assetFactory: AssetFactory }) => {
    const { events, assetFactory } = props;
    createLights({ assetFactory });
    const cockpit = createCockpit({ assetFactory, events });
    createCorridor({ assetFactory });
    return {
        cockpit,
    };
};

const createLights = (props: { assetFactory: AssetFactory }) => {
    const scene = props.assetFactory.scene;
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), scene);
    light.intensity = 0.01;
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
};

const createCockpit = (props: { assetFactory: AssetFactory; events: localEvents.Events }) => {
    const { assetFactory, events } = props;
    const cockpit = assets.cockpit({ assetFactory });
    cockpit.position = new BABYLON.Vector3(-1, 0, 0);
    cockpit.scaling = new BABYLON.Vector3(10, 10, 10);
    cockpit.monitors.visibility = 0;
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
        scene: assetFactory.scene,
        radius: 50,
        height: 50,
        parent: cockpit,
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

const createCorridor = (props: { assetFactory: AssetFactory }) => {
    const { assetFactory } = props;
    const create = (position: BABYLON.Vector3) => {
        const model = assets.skyCorridor({ assetFactory });
        model.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
        model.scaling = new BABYLON.Vector3(100, 100, 100);
        model.position = position;
        return model;
    };
    const offset = 300;
    for (let i = 0; i < 30; i++) {
        create(new BABYLON.Vector3(30, 70, -100 + i * offset));
    }
};
