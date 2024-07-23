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
            name: 'Sci Fi Spacestation Corridor',
            link: 'https://skfb.ly/6RXTF',
            model: (() => {
                const model = new models.Model({
                    name: 'corridor',
                    scene,
                    entityManager,
                    asset: { file: 'corridor_1k.glb', directory: 'assets/corridor/' },
                });
                model.transform.position = new BABYLON.Vector3(3.5, 0, 0);
                return model;
            })(),
            credits:
                '"Sci Fi Spacestation Corridor" (https://skfb.ly/6RXTF) by Siamak Tavakoli is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
        },
    ];
};
