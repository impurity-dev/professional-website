import { Vector3 } from '@babylonjs/core';
import * as states from '../managers/states.js';
import * as skyboxes from '../shared/skyboxes.js';
import * as localEvents from './events.js';
import * as guis from './guis.js';
import * as inputs from './inputs.js';
import * as localSounds from './sounds.js';
import * as worlds from './worlds.js';

export class State extends states.State {
    async run(): Promise<void> {
        const { scene, entityManager, start$, destroy$ } = this;
        const events = new localEvents.Events({ start$, destroy$ });
        const target = new Vector3(4, 1, -5);
        new worlds.CharacterWorld({ scene, entityManager, target, events });
        const load = this.entityManager.load();
        guis.gui({ scene, events });
        new inputs.CharacterController({ scene, target, events });
        localSounds.sounds({ scene, events });
        skyboxes.purpleSpace({ scene });
        await load;
    }
}
