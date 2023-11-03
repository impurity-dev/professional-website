import { FreeCamera, HemisphericLight, Vector3, DirectionalLight, Color3, ShadowGenerator } from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from './state.js';
import { EntityManager } from '../managers/entity-manager.js';
import * as lowPoly from '../entities/low-poly-entity.js';

export class StartState extends State {
    run = async (): Promise<void> => {
        const entityManager = new EntityManager(this.assetManager);
        entityManager.queue(lowPoly.floorTileBasic);
        entityManager.queue(lowPoly.windowWallSideA);
        entityManager.queue(lowPoly.windowWallSideB);
        await entityManager.load();

        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                const floorTileBasic = entityManager.get(lowPoly.floorTileBasic);
                floorTileBasic.position = new Vector3(x * 2, 0, z * 2);
                floorTileBasic.getChildMeshes().forEach((m) => {
                    m.receiveShadows = true;
                    m.checkCollisions = true;
                });
            }
        }

        const windowA = entityManager.get(lowPoly.windowWallSideA);
        windowA.getChildMeshes().forEach((m) => {
            m.receiveShadows = true;
            m.checkCollisions = true;
        });
        windowA.position.x = 4;
        const windowB = entityManager.get(lowPoly.windowWallSideB);
        windowB.getChildMeshes().forEach((m) => {
            m.receiveShadows = true;
            m.checkCollisions = true;
        });

        const camera = new FreeCamera('Camera', new Vector3(0, 5, 0), this.scene);
        camera.setTarget(new Vector3(5, 5, 0));
        camera.attachControl();

        const dL = new DirectionalLight('directionalLight', new Vector3(1, 0, 1), this.scene);
        dL.diffuse = new Color3(1, 0, 0);
        dL.specular = new Color3(1, 1, 0);

        new ShadowGenerator(1024, dL);
        new IntroSound(this.scene);
        new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
        new SpaceSkybox(this.scene);
    };
}
