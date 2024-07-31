import * as cameras from './cameras';
import * as localEvents from './events';
import * as sm from './state-machines';
import * as states from '../managers/states.js';
import * as worlds from './worlds.js';
import * as skyboxes from '../shared/skyboxes.js';
import * as inputs from './inputs.js';
import * as BABYLON from '@babylonjs/core';

export class State extends states.State {
    async run(): Promise<void> {
        const { scene, entityManager, start$, destroy$ } = this;
        const events = new localEvents.Events({ start$, destroy$ });
        worlds.world({ scene, entityManager, events });
        const load = this.entityManager.load();
        sm.launchSequence({ events });
        cameras.playerCamera({ scene, location: new BABYLON.Vector3(0, 28.5, -13.5), target: new BABYLON.Vector3(0, 25, 1) });
        skyboxes.purpleSpace({ scene });
        await load;
    }
}
