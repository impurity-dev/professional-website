import * as BABYLON from '@babylonjs/core';
import * as skyboxes from '../shared/skyboxes';
import * as states from '../managers/states.js';
import * as worlds from './worlds.js';
import * as controllers from './inputs.js';
import * as guis from './guis.js';
import * as localEvents from './events.js';
import * as sounds from './sounds.js';
import * as assets from './assets';
import { filter, take, tap } from 'rxjs';

export class State extends states.State {
    assets = [
        assets.FIGHTER_ASSET,
        assets.PROPSBASE_ASSET,
        assets.ROOFEMPTY_ASSET,
        assets.FLOORBASIC1_ASSET,
        assets.DOORDOUBLE_WALL_SIDEA,
        assets.DOORDOUBLE_WALL_SIDEB,
        assets.DOOR_DOUBLE,
        assets.WALLPIPES_ASSET,
        assets.WALL1_ASSET,
        assets.WALL2_ASSET,
        assets.WALL3_ASSET,
        assets.WALL5_ASSET,
        assets.COLUMNSLIM_ASSET,
        assets.COLUMN1_ASSET,
        assets.COLUMN2_ASSET,
        assets.COLUMN3_ASSET,
    ];

    build = async () => {
        const { scene, start$, destroy$, assetFactory } = this;
        const events = new localEvents.Events({ start$, destroy$ });
        new controllers.FPSController({ scene, location: new BABYLON.Vector3(-20, 2, 1), target: new BABYLON.Vector3(2, 2, 0), events });
        worlds.world({ assetFactory, events });
        guis.gui({ scene, events });
        sounds.trailerMusic({ scene });
        skyboxes.purpleSpace({ scene });
        events.actions$
            .pipe(
                filter((a) => a.type === 'fighter'),
                take(1),
                tap(() => this.gameManager.goTo({ type: 'fighter' })),
            )
            .subscribe();
    };
}
