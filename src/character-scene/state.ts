import * as states from '../managers/states.js';
import * as worlds from './worlds.js';
import * as skyboxes from '../shared/skyboxes.js';
import * as inputs from './inputs.js';
import * as BABYLON from '@babylonjs/core';

export class CharacterState extends states.State {
    async run(): Promise<void> {
        const { scene, entityManager } = this;
        new worlds.CharacterWorld({ scene, entityManager });
        const load = this.entityManager.load();
        new inputs.CharacterController({ scene, location: new BABYLON.Vector3(0, 28.5, -13.5), target: new BABYLON.Vector3(0, 25, 1) });
        skyboxes.purpleSpace({ scene });
        await load;
    }
}
