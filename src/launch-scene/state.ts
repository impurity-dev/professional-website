import * as states from '../managers/states.js';
import * as worlds from './worlds.js';
import * as skyboxes from '../shared/skyboxes.js';
import * as inputs from './inputs.js';
import * as BABYLON from '@babylonjs/core';

export class LaunchState extends states.State {
    async run(): Promise<void> {
        const { scene, entityManager } = this;
        new worlds.LaunchWorld({ scene, entityManager });
        const load = this.entityManager.load();
        new inputs.FPSController({ scene, location: BABYLON.Vector3.Zero(), target: new BABYLON.Vector3(1, 0, 0) });
        skyboxes.purpleSpace({ scene });
        await load;
    }
}
