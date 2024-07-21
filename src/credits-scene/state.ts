import * as BABYLON from '@babylonjs/core';
import { takeUntil, tap } from 'rxjs';
import * as states from '../managers/states.js';
import * as skyboxes from '../shared/skyboxes.js';
import * as events from './events.js';
import * as guis from './guis.js';
import * as inputs from './inputs.js';
import * as sounds from './sounds.js';
import * as worlds from './worlds.js';

export class CreditsState extends states.State {
    async run(): Promise<void> {
        const { scene, entityManager, destroy$, start$ } = this;
        const event = new events.Events({ start$, destroy$ });
        new worlds.CreditsWorld({ scene, entityManager, event });
        const load = this.entityManager.load();
        event.returnToMainMenu$
            .pipe(
                tap(() => this.gameManager.goTo({ type: 'menu' })),
                takeUntil(event.destroy$),
            )
            .subscribe();
        sounds.sounds({ scene, event });
        new guis.Gui({ scene, event });
        new inputs.CreditsController({ scene, target: new BABYLON.Vector3(0, 0, 0), event });
        skyboxes.purpleSpace({ scene });
        await load;
    }
}
