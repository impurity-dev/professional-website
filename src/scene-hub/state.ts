import * as BABYLON from '@babylonjs/core';
import * as skyboxes from '../shared/skyboxes';
import * as states from '../managers/states.js';
import * as worlds from './worlds.js';
import * as controllers from './inputs.js';
import * as guis from './guis.js';
import * as localEvents from './events.js';
import * as assets from './assets';
import { filter, take, tap } from 'rxjs';

export class State extends states.State {
    assets = [assets.SPACECOLONY_ASSET];

    build = async () => {
        const { scene, start$, destroy$, assetFactory } = this;
        const events = new localEvents.Events({ start$, destroy$ });
        new controllers.FPSController({ scene, location: new BABYLON.Vector3(0, 1, 0), target: new BABYLON.Vector3(1, 1, 0), events });
        worlds.world({ assetFactory, events });
        guis.gui({ scene, events });
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
