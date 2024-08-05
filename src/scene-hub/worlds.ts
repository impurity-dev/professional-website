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
    assets.test({ assetFactory });
    new BABYLON.DirectionalLight('light', new BABYLON.Vector3(1, 0, 0));
};
