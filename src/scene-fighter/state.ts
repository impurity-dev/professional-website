import * as skyboxes from '../shared/skyboxes.js';
import * as states from '../managers/states.js';
import { FighterController } from './inputs.js';
import { FighterWorld } from './world.js';
import { FighterCamera } from './camera.js';
import { FighterEvents } from './events.js';
import { FighterGui } from './gui.js';

export class State extends states.State {
    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        const events = new FighterEvents();
        const world = new FighterWorld({ scene, entityManager, events });
        const load = this.entityManager.load();
        new FighterGui({ scene, events });
        new FighterCamera({ scene, target: world.fighterModel.transform });
        new FighterController({ scene, events });
        skyboxes.purpleSpace({ scene });
        await load;
    };
}
