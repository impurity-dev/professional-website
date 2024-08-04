import * as skyboxes from '../shared/skyboxes.js';
import * as states from '../managers/states.js';
import * as worlds from './world.js';
import * as localEvents from './events.js';
import * as cameras from './cameras.js';
import * as inputs from './inputs.js';
import * as assets from './assets.js';

export class State extends states.State {
    assets = [assets.FIGHTER_ASSET];

    build = async () => {
        const { scene, assetFactory } = this;
        const events = new localEvents.Events();
        const { fighter } = worlds.world({ assetFactory, events });
        cameras.mainCamera({ scene, target: fighter });
        inputs.controller({ scene, events });
        skyboxes.purpleSpace({ scene });
    };
}
