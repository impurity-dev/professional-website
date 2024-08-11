import * as BABYLON from '@babylonjs/core';
import * as assets from './assets';
import * as localEvents from './events';
import { AssetFactory } from '../managers/asset-factory.js';

export const world = (props: { assetFactory: AssetFactory; events: localEvents.Events }) => {
    const { assetFactory } = props;
    const spaceColony = assets.spaceColony({ assetFactory });
    const all = spaceColony.all();
    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 1));
};
