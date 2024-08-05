import * as BABYLON from '@babylonjs/core';
import { CaroselItem } from './carosels';
import { AssetFactory } from '../managers/asset-factory';
import * as assets from './assets';

export const creditItems: (props: { assetFactory: AssetFactory }) => CaroselItem[] = (props: { assetFactory: AssetFactory }) => {
    const { assetFactory } = props;
    return [
        {
            name: 'Light Fighter Spaceship',
            link: 'https://sketchfab.com/3d-models/light-fighter-spaceship-free-51616ef53af84fe595c5603cd3e0f3e1',
            model: assetFactory.getContainer(assets.FIGHTER_ASSET),
            credits:
                '"LIGHT FIGHTER SPACESHIP - FREE" by Kerem Kavalci. https://sketchfab.com/3d-models/light-fighter-spaceship-free-51616ef53af84fe595c5603cd3e0f3e1',
        },
        {
            name: 'Bar',
            link: 'https://skfb.ly/6XytO',
            model: (() => {
                const model = assetFactory.getContainer(assets.BAR_ASSET);
                const scale = 0.035;
                model.scaling = new BABYLON.Vector3(scale, scale, scale);
                model.position = new BABYLON.Vector3(3.5, 0, 3.5);
                return model;
            })(),
            credits:
                '"Bar" (https://skfb.ly/6XytO) by Edward Joseph is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
        },
        {
            name: 'Cloning Tank Chamber',
            link: 'https://skfb.ly/oODEM',
            model: (() => {
                const model = assetFactory.getContainer(assets.CHAMBER_ASSET);
                model.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
                model.position = new BABYLON.Vector3(0, 0, -2.5);
                return model;
            })(),
            credits:
                '"Cloning Tank Chamber JFG - Roblox PBR Showcase" (https://skfb.ly/oODEM) by Jesus Fernandez Garcia is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
        },
        {
            name: '016Mabc Sky Corridor',
            link: 'https://skfb.ly/R8qX',
            model: (() => {
                const model = assetFactory.getContainer(assets.SKYCORRIDOR_ASSET);
                model.position = new BABYLON.Vector3(4, 0, -2.8);
                model.scaling = new BABYLON.Vector3(2, 2, 2);
                return model;
            })(),
            credits:
                '"016Mabc Sky Corridor" (https://skfb.ly/R8qX) by d880 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
        },
        {
            name: 'Spacefighter Cockpit (Wasp Interdictor)',
            link: 'https://skfb.ly/NsXn',
            model: (() => {
                const model = assetFactory.getContainer(assets.COCKPIT_ASSET);
                model.position = new BABYLON.Vector3(0, -5, 3.5);
                model.scaling = new BABYLON.Vector3(3, 3, 3);
                return model;
            })(),
            credits:
                '"Spacefighter Cockpit (Wasp Interdictor)" (https://skfb.ly/NsXn) by Comrade1280 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).',
        },
        {
            name: 'Space Colony Modular Kit Bash',
            link: 'https://skfb.ly/ovVRF',
            model: (() => {
                const model = assetFactory.getContainer(assets.SPACECOLONY_ASSET);
                model.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
                model.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 2);
                model.position = new BABYLON.Vector3(4, 0, -4);
                model
                    .getChildTransformNodes()
                    .find((n) => n.name === 'Text')
                    .dispose();
                return model;
            })(),
            credits: `"Space Colony Modular Kit Bash" (https://skfb.ly/ovVRF) by R-LAB is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).`,
        },
    ];
};
