import * as BABYLON from '@babylonjs/core';
import * as skyboxes from '../shared/skyboxes';
import * as states from '../managers/states.js';
import * as worlds from './worlds.js';
import * as controllers from './inputs.js';
import * as guis from './guis.js';
import * as events from './events.js';
import * as sounds from './sounds.js';

export class HubState extends states.State {
    private isLaunchable = false;

    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        const event = new events.HubEvents();
        new controllers.FPSController({ scene, location: new BABYLON.Vector3(-20, 2, 1), target: new BABYLON.Vector3(2, 2, 0), event });
        new worlds.StartWorld({ scene, entityManager, event });
        const load = this.entityManager.load();
        new guis.HubGui({ scene, event });
        event.onTrigger.add(({ toggle }) => (this.isLaunchable = toggle));
        event.onAction.add(() => {
            if (!this.isLaunchable) return;
            this.gameManager.goTo({ type: 'fighter' });
        });
        sounds.trailerMusic({ scene });
        skyboxes.purpleSpace({ scene });

        await load;
    };
}
