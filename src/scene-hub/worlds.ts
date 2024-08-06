import * as BABYLON from '@babylonjs/core';
import * as assets from './assets';
import * as localEvents from './events';
import { AssetFactory } from '../managers/asset-factory.js';

export const world = (props: { assetFactory: AssetFactory; events: localEvents.Events }) => {
    const { assetFactory } = props;
    const node = assets.spacecolony({ assetFactory });
    console.log(
        node
            .getChildTransformNodes(undefined, (n) => n.parent.name === 'RootNode')
            .map((n) => n.name)
            .join(','),
    );
    const test = assets.test({ assetFactory });
    test.position = new BABYLON.Vector3(-12, 0, 1);
    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 1));
};
