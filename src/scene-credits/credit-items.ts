import * as BABYLON from '@babylonjs/core';
import * as em from '../models/entity-manager';
import * as models from '../models/models';
import { CaroselItem } from './carosels';

type GetItemProps = { scene: BABYLON.Scene; entityManager: em.EntityManager };
export const creditItems: (x: GetItemProps) => CaroselItem[] = (props: GetItemProps) => {
    const { scene, entityManager } = props;
    return [
        {
            name: 'Light Fighter Spaceship',
            link: 'https://sketchfab.com/3d-models/light-fighter-spaceship-free-51616ef53af84fe595c5603cd3e0f3e1',
            model: new models.Model({
                name: 'fighter',
                scene,
                entityManager,
                asset: { file: 'fighter.glb', directory: 'assets/fighter/' },
            }),
            credits:
                '"LIGHT FIGHTER SPACESHIP - FREE" by Kerem Kavalci. https://sketchfab.com/3d-models/light-fighter-spaceship-free-51616ef53af84fe595c5603cd3e0f3e1',
        },
        {
            name: 'Bar',
            link: 'https://skfb.ly/6XytO',
            model: (() => {
                const model = new models.Model({
                    name: 'bar',
                    scene,
                    entityManager,
                    asset: { file: 'cantina_1k.glb', directory: 'assets/cantina/' },
                });
                const scale = 0.035;
                model.transform.scaling = new BABYLON.Vector3(scale, scale, scale);
                model.transform.position = new BABYLON.Vector3(3.5, 0, 3.5);
                return model;
            })(),
            credits:
                '"Bar" (https://skfb.ly/6XytO) by Edward Joseph is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
        },
        {
            name: 'Cloning Tank Chamber',
            link: 'https://skfb.ly/oODEM',
            model: (() => {
                const model = new models.Model({
                    name: 'chamber',
                    scene,
                    entityManager,
                    asset: { file: 'chamber_1k.glb', directory: 'assets/chamber/' },
                });
                model.transform.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
                model.transform.position = new BABYLON.Vector3(0, 0, -2.5);
                return model;
            })(),
            credits:
                '"Cloning Tank Chamber JFG - Roblox PBR Showcase" (https://skfb.ly/oODEM) by Jesus Fernandez Garcia is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
        },
        {
            name: '016Mabc Sky Corridor',
            link: 'https://skfb.ly/R8qX',
            model: (() => {
                const model = new models.Model({
                    name: 'sky-corridor',
                    scene,
                    entityManager,
                    asset: { file: 'sky_corridor_1k.glb', directory: 'assets/sky-corridor/' },
                });
                model.transform.position = new BABYLON.Vector3(4, 0, -2.8);
                model.transform.scaling = new BABYLON.Vector3(2, 2, 2);
                return model;
            })(),
            credits:
                '"016Mabc Sky Corridor" (https://skfb.ly/R8qX) by d880 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
        },
        {
            name: 'Spacefighter Cockpit (Wasp Interdictor)',
            link: 'https://skfb.ly/NsXn',
            model: (() => {
                const model = new models.Model({
                    name: 'cockpit',
                    scene,
                    entityManager,
                    asset: { file: 'cockpit_1k.glb', directory: 'assets/cockpit/' },
                });
                model.transform.position = new BABYLON.Vector3(0, -5, 3.5);
                model.transform.scaling = new BABYLON.Vector3(3, 3, 3);
                return model;
            })(),
            credits:
                '"Spacefighter Cockpit (Wasp Interdictor)" (https://skfb.ly/NsXn) by Comrade1280 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
        },
    ];
};
