import * as BABYLON from '@babylonjs/core';
import * as em from '../models/entity-manager.js';
import { World } from '../shared/world.js';
import { CharacterSelector } from './character-selectors';
import * as localEvents from './events';
import * as localModels from './models';

export class CharacterWorld extends World {
    constructor(props: { scene: BABYLON.Scene; entityManager: em.EntityManager; target: BABYLON.Vector3; events: localEvents.Events }) {
        const { scene, entityManager, target, events } = props;
        super(scene, entityManager);
        this.globalLights({ scene });
        this.pointLights({ scene });
        this.cantina({ scene, entityManager });
        this.characters({ scene, entityManager, target, events });
    }

    private pointLights = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const light = new BABYLON.PointLight('light', new BABYLON.Vector3(0, 1, 1), scene);
        light.intensity = 0.5;
        light.radius = 10;
        const color = new BABYLON.Color3(1, 0.5, 0);
        light.diffuse = color;
        light.specular = color;
        const colorKeys = [
            {
                frame: 0,
                value: color,
            },
            {
                frame: 30,
                value: new BABYLON.Color3(1, 0, 1),
            },
            {
                frame: 60,
                value: color,
            },
        ];
        const diffuseAnim = new BABYLON.Animation('color', 'diffuse', 30, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        diffuseAnim.setKeys(colorKeys);
        const specularAnim = new BABYLON.Animation('color', 'specular', 30, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        specularAnim.setKeys(colorKeys);
        const flickerAnim = new BABYLON.Animation('flicker', 'intensity', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        flickerAnim.setKeys([
            {
                frame: 0,
                value: 5,
            },
            {
                frame: 30,
                value: 20,
            },
            {
                frame: 60,
                value: 5,
            },
        ]);
        light.animations = [flickerAnim, specularAnim, diffuseAnim];
        scene.beginAnimation(light, 0, 60, true, 0.25);
    };

    private globalLights = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const light = new BABYLON.DirectionalLight('directionLight', new BABYLON.Vector3(0, 1, 1), scene);
        light.intensity = 0.5;
        const color = new BABYLON.Color3(1, 0.5, 0);
        light.diffuse = color;
        light.specular = color;
    };

    private cantina = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager }) => {
        const { scene, entityManager } = props;
        const model = localModels.cantina({ scene, entityManager });
        model.transform.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
        model.transform.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI / 2);
        return model;
    };

    private characters = (props: { scene: BABYLON.Scene; entityManager: em.EntityManager; target: BABYLON.Vector3; events: localEvents.Events }) => {
        const { scene, entityManager, target, events } = props;
        return new CharacterSelector({ scene, entityManager, location: target, events });
    };
}
