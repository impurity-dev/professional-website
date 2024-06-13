import * as BABYLON from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from './state.js';
import { StartWorld } from '../environments/start-world.js';
import { FirstPersonController } from '../controllers/first-person-controller.js';
import { Model } from '../entities/model.js';
import { fresnelMaterial } from '../materials';

export class StartState extends State {
    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        new FirstPersonController(scene, new BABYLON.Vector3(-19, 2, 0), new BABYLON.Vector3(2, 2, 0));

        new StartWorld(scene, entityManager);

        const fighter = new Model({
            name: 'fighter',
            scene,
            entityManager,
            asset: { file: 'fighter.glb', directory: 'assets/fighter/' },
        });
        fighter.transform.position = new BABYLON.Vector3(0, 0, 0);
        await this.entityManager.load();
        const fresnel = fresnelMaterial(scene);
        fighter.transform.getChildMeshes().forEach((m) => {
            m.material = fresnel;
        });
        new IntroSound(scene);
        new SpaceSkybox(scene);

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), this.scene);
        light.intensity = 0.1;
        // light.diffuse = new Color3(0.3, 0.1, 0.3);
        light.specular = new BABYLON.Color3(1, 1, 0);
    };
}
