import { Vector3, MeshBuilder, PointLight, Color3, TransformNode, HemisphericLight } from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { State } from './state.js';
import { StartWorld } from '../environments/start-world.js';
import { FirstPersonController } from '../controllers/first-person-controller.js';
import * as models from '../entities/model.js';

export class StartState extends State {
    run = async (): Promise<void> => {
        const { scene, entityManager } = this;
        const framesPerSecond = 60;
        const gravity = -9.81;
        scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
        scene.collisionsEnabled = true;
        scene.onPointerDown = (event) => {
            if (event.button === 0) scene.getEngine().enterPointerlock();
            if (event.button === 1) scene.getEngine().exitPointerlock();
        };

        new StartWorld(scene, entityManager);
        await this.entityManager.load();

        new FirstPersonController(scene);
        new IntroSound(scene);
        new SpaceSkybox(scene);

        const light = new HemisphericLight('light', new Vector3(0, 1, 1), this.scene);
        light.intensity = 1;
        // light.diffuse = new Color3(0.3, 0.1, 0.3);
        light.specular = new Color3(1, 1, 0);
        // this.test();
    };

    test = () => {
        this.build(0, 0);
        this.build(5, 0.2);
        this.build(10, 0.4);
        this.build(15, 0.6);
        this.build(20, 1);
    };

    build = (offset, color) => {
        const parent1 = new TransformNode('', this.scene);
        const box1 = MeshBuilder.CreateBox('box1', { size: 1 });
        box1.position = new Vector3(0, 0.5, offset);
        const light1 = new PointLight('light1', new Vector3(0, 2, offset), this.scene);
        light1.position = box1.position.add(new Vector3(0, 2, 0));
        light1.diffuse = new Color3(1, color, color);
        box1.parent = parent1;
        light1.includedOnlyMeshes.push(...parent1.getChildMeshes());

        const box2 = MeshBuilder.CreateBox('box2', { size: 1 });
        box2.position = new Vector3(2, 0.5, offset);
        const light2 = new PointLight('light2', new Vector3(0, 2, offset), this.scene);
        light2.position = box2.position.add(new Vector3(0, 2, 0));
        light2.diffuse = new Color3(1, 1, color);
        light2.includedOnlyMeshes.push(box2);

        const box3 = MeshBuilder.CreateBox('box3', { size: 1 });
        box3.position = new Vector3(-2, 0.5, offset);
        const light3 = new PointLight('light3', new Vector3(0, 2, offset), this.scene);
        light3.position = box3.position.add(new Vector3(0, 2, 0));
        light3.diffuse = new Color3(1, color, 1);
        light3.includedOnlyMeshes.push(box3);

        const box4 = MeshBuilder.CreateBox('box4', { size: 1 });
        box4.position = new Vector3(4, 0.5, offset);
        const light4 = new PointLight('light4', new Vector3(0, 2, offset), this.scene);
        light4.position = box4.position.add(new Vector3(0, 2, 0));
        light4.diffuse = new Color3(color, 1, 1);
        light4.includedOnlyMeshes.push(box4);

        const box5 = MeshBuilder.CreateBox('box5', { size: 1 });
        box5.position = new Vector3(-4, 0.5, offset);
        const light5 = new PointLight('light5', new Vector3(0, 2, offset), this.scene);
        light5.position = box5.position.add(new Vector3(0, 2, 0));
        light5.diffuse = new Color3(color, color, 1);
        light5.includedOnlyMeshes.push(box5);
    };
}
