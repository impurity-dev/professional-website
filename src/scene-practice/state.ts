import * as BABYLON from '@babylonjs/core';
import * as skyboxes from '../shared/skyboxes.js';
import * as states from '../managers/states.js';

export class State extends states.State {
    assets = [];

    build = async () => {
        const { scene } = this;
        const position = new BABYLON.Vector3(0, 0, 0);
        const camera = new BABYLON.FreeCamera('camera', position, scene);
        scene.activeCamera = camera;
        camera.attachControl();

        skyboxes.purpleSpace({ scene });

        new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 0), scene);
    };
}
