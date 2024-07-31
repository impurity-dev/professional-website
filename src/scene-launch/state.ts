import * as cameras from './cameras';
import * as localEvents from './events';
import * as sm from './state-machines';
import * as states from '../managers/states.js';
import * as worlds from './worlds.js';
import * as skyboxes from '../shared/skyboxes.js';
import * as inputs from './inputs.js';
import * as BABYLON from '@babylonjs/core';
import { delay, Observable, take, tap } from 'rxjs';

export class State extends states.State {
    async run(): Promise<void> {
        const { scene, entityManager, start$, destroy$ } = this;
        const events = new localEvents.Events({ start$, destroy$ });
        const { cockpit } = worlds.world({ scene, entityManager, events });
        const load = this.entityManager.load();
        sm.launchSequence({ events });
        const { playerCamera } = cameras.playerCamera({
            scene,
            location: new BABYLON.Vector3(0, 2.75, -1.5),
            target: new BABYLON.Vector3(0, 1, 25),
            parent: cockpit.transform,
        });
        inputs.controls({ camera: playerCamera });
        skyboxes.purpleSpace({ scene });
        await load;
        events.state$
            .pipe(
                take(1),
                delay(5000),
                tap(() => events.state$.next({ type: 'launch' })),
            )
            .subscribe();
    }
}
