import * as cameras from './cameras';
import * as localEvents from './events';
import * as sm from './state-machines';
import * as states from '../managers/states.js';
import * as worlds from './worlds.js';
import * as skyboxes from '../shared/skyboxes.js';
import * as inputs from './inputs.js';
import * as BABYLON from '@babylonjs/core';
import { delay, filter, firstValueFrom, take, tap } from 'rxjs';
import { AssetFactory } from '../nodes/nodes';
import * as temp from './temp';

export class State extends states.State {
    assetFactory = new AssetFactory({ scene: this.scene, assetManager: this.assetManager });
    load$ = () => {
        const { assetFactory } = this;
        assetFactory.queue(temp.SKYCORRIDOR_ASSET, temp.COCKPIT_ASSET, temp.LIGHT14_ASSET);
        return assetFactory.load$();
    };
    async run(): Promise<void> {
        const { scene, start$, destroy$, assetFactory } = this;
        await firstValueFrom(this.load$());
        const events = new localEvents.Events({ start$, destroy$ });
        const { cockpit } = worlds.world({ events, assetFactory });
        sm.launchSequence({ events });
        const { playerCamera } = cameras.playerCamera({
            scene,
            location: new BABYLON.Vector3(0, 2.6, -1.3),
            target: new BABYLON.Vector3(0, 0.85, 25),
            parent: cockpit,
            events,
        });
        inputs.controls({ camera: playerCamera });
        skyboxes.purpleSpace({ scene });
        // await load;
        events.state$
            .pipe(
                take(1),
                delay(1_000),
                tap(() => events.state$.next({ type: 'dialogue' })),
                delay(1_000),
                tap(() => events.state$.next({ type: 'monitors' })),
            )
            .subscribe();
        events.state$
            .pipe(
                filter((state) => state.type === 'space'),
                take(1),
                delay(10_000),
                // tap(() => this.gameManager.goTo({ type: 'hub' })),
            )
            .subscribe();
    }
}
