import * as BABYLON from '@babylonjs/core';
import { filter, take, tap } from 'rxjs';
import * as states from '../managers/states.js';
import * as skyboxes from '../shared/skyboxes.js';
import * as cameras from './cameras.js';
import * as localEvents from './events.js';
import * as guis from './guis.js';
import * as inputs from './inputs.js';
import * as localSounds from './sounds.js';
import * as sm from './state-machines.js';
import * as worlds from './worlds.js';

export class State extends states.State {
    async run(): Promise<void> {
        const { scene, entityManager, start$, destroy$ } = this;
        const events = new localEvents.Events({ start$, destroy$ });
        const target = new BABYLON.Vector3(4, 1, -5);
        const { characterLookup } = worlds.world({ scene, entityManager, target, events });
        const load = this.entityManager.load();
        events.state$
            .pipe(
                filter((state) => state.type === 'exit'),
                take(1),
                tap(() => this.gameManager.goTo({ type: 'launch' })),
            )
            .subscribe();
        const { dialogueTextBox } = guis.gui({ scene, events });
        sm.stateMachine({
            events,
            textBlock: dialogueTextBox,
            lookup: characterLookup,
        });
        cameras.mainCamera({ scene, target, events });
        inputs.controller({ scene, events });
        localSounds.sounds({ scene, events });
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
        await load;
    }
}
