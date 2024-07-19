import * as BABYLON from '@babylonjs/core';
import * as states from '../managers/states.js';
import * as skyboxes from '../shared/skyboxes.js';
import * as inputs from './inputs.js';
import * as worlds from './worlds.js';

export class CreditsState extends states.State {
    async run(): Promise<void> {
        const { scene, entityManager } = this;
        new worlds.CreditsWorld({ scene, entityManager });
        const load = this.entityManager.load();
        new inputs.CreditsController({ scene, target: new BABYLON.Vector3(0, 0, 0) });
        skyboxes.purpleSpace({ scene });
        await load;
    }
}
