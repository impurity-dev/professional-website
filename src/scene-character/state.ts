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
import * as assets from './assets.js';

export class State extends states.State {
    assets = [
        assets.CANTINA_ASSET,
        assets.GEORGE_ASSET,
        assets.FEMALE_ADVENTURER,
        assets.FEMALE_CASUAL,
        assets.FEMALE_FORMAL,
        assets.FEMALE_MEDIEVAL,
        assets.FEMALE_PUNK,
        assets.FEMALE_SCIFI,
        assets.FEMALE_SOLDIER,
        assets.FEMALE_SUIT,
        assets.FEMALE_WITCH,
        assets.FEMALE_WORKER,
        assets.MALE_ADVENTURER,
        assets.MALE_BEACH,
        assets.MALE_CASUAL,
        assets.MALE_HOODIE,
        assets.MALE_FARMER,
        assets.MALE_KING,
        assets.MALE_PUNK,
        assets.MALE_SPACESUIT,
        assets.MALE_SUIT,
        assets.MALE_SWAT,
        assets.MALE_WORKER,
    ];

    build = async () => {
        const { scene, assetFactory, start$, destroy$ } = this;
        const events = new localEvents.Events({ start$, destroy$ });
        const target = new BABYLON.Vector3(4, 1, -5);
        const { characters } = worlds.world({ assetFactory, target, events });
        events.state$
            .pipe(
                filter((state) => state.type === 'exit'),
                take(1),
                tap(() => this.gameManager.goTo({ type: 'launch' })),
            )
            .subscribe();
        const { dialogueBox } = guis.gui({ scene, events });
        sm.stateMachine({ events, dialogueBox, characters });
        cameras.mainCamera({ scene, target, events });
        inputs.controller({ scene, events });
        localSounds.sounds({ scene, events });
        skyboxes.purpleSpace({ scene });
    };
}
