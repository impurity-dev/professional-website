import * as BABYLON from '@babylonjs/core';
import * as em from '../managers/entity-manager.js';
import { World } from '../shared/world.js';

export class CreditsWorld extends World {
    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) {
        const { scene, entityManager } = props;
        super(scene, entityManager);
        this.lights({ scene });
        this.ground({ scene });
    }

    private lights = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), scene);
        light.intensity = 0.3;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };

    private ground = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const mesh = BABYLON.MeshBuilder.CreateGround('ground', { width: 100, height: 100, subdivisions: 100 }, scene);
        mesh.checkCollisions = true;
        return mesh;
    };
}
