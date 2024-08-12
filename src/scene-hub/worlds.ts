import * as BABYLON from '@babylonjs/core';
import * as assets from './assets';
import * as localEvents from './events';
import { AssetFactory } from '../managers/asset-factory.js';

export const world = (props: { assetFactory: AssetFactory; events: localEvents.Events }) => {
    const { assetFactory } = props;
    lights();
    tunnels({ assetFactory });
    floors({ assetFactory });
};

export const lights = () => {
    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 1));
};

export const tunnels = (props: { assetFactory: AssetFactory }) => {
    const { assetFactory } = props;
    const spaceColony = assets.spaceColony({ assetFactory });
    const parent = new BABYLON.TransformNode('tunnels', assetFactory.scene);
    put(spaceColony.tunnels.end, {
        parent,
        position: new BABYLON.Vector3(-4, -0, 0),
        rotation: new BABYLON.Vector3(0, Math.PI / 2, 0),
    });
    put(spaceColony.tunnels.straight, {
        parent,
        position: new BABYLON.Vector3(0, 0, 0),
    });
    put(spaceColony.tunnels.straight, {
        parent,
        position: new BABYLON.Vector3(8, 0, 0),
    });
    put(spaceColony.tunnels.straight, {
        parent,
        position: new BABYLON.Vector3(16, 0, 0),
    });
    put(spaceColony.tunnels.cross, {
        parent,
        position: new BABYLON.Vector3(27, 0, 0),
    });
    put(spaceColony.tunnels.straight, {
        parent,
        position: new BABYLON.Vector3(37.75, 0, 0),
    });
    put(spaceColony.tunnels.elbow, {
        parent,
        position: new BABYLON.Vector3(24, 0, 16),
        rotation: new BABYLON.Vector3(0, Math.PI, 0),
    });
};

export const floors = (props: { assetFactory: AssetFactory }) => {
    const { assetFactory } = props;
    const spaceColony = assets.spaceColony({ assetFactory });
    const parent = new BABYLON.TransformNode('floors', assetFactory.scene);

    const XOffset = 50;
    const ZOffset = -20;
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 25; j++) {
            put(spaceColony.floors.greys.blank, {
                parent,
                position: new BABYLON.Vector3(i * 2 + XOffset, 0, j * 2 + ZOffset),
            });
        }
    }
};

export const put = <T extends BABYLON.TransformNode>(
    builder: () => T,
    props: {
        parent: BABYLON.TransformNode;
        position?: BABYLON.Vector3;
        rotation?: BABYLON.Vector3;
        scaling?: BABYLON.Vector3;
    },
): T => {
    const transform = builder();
    transform.parent = props.parent;
    if (props.position) transform.position = props.position;
    if (props.rotation) transform.rotation = props.rotation;
    if (props.scaling) transform.scaling = props.scaling;
    return transform;
};
