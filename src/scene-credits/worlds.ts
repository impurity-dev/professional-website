import * as BABYLON from '@babylonjs/core';
import * as em from '../models/entity-manager.js';
import * as assets from './assets.js';
import { Carosel } from './carosels.js';
import * as creditItems from './credit-items.js';
import * as events from './events.js';
import { AssetFactory } from '../managers/asset-factory.js';

export class CreditsWorld {
    constructor(props: { assetFactory: AssetFactory; event: events.Events }) {
        const { assetFactory, event } = props;
        this.lights({ assetFactory });
        this.chamber({ assetFactory });
        this.items({ assetFactory });
        this.carosel({ assetFactory, event });
    }

    private items = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const box = BABYLON.CreateBox('box', { size: 1 }, assetFactory.scene);
        box.position = BABYLON.Vector3.Zero();
    };

    private lights = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), assetFactory.scene);
        light.intensity = 0.3;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };

    private chamber = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const model = assetFactory.getContainer(assets.CHAMBER_ASSET);
        model.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        model.position = new BABYLON.Vector3(0, -10, -31.5);
        return model;
    };

    private carosel = (props: { assetFactory: AssetFactory; event: events.Events }) => {
        const { assetFactory, event } = props;
        const items = creditItems.creditItems({ assetFactory });
        return new Carosel({ items, event });
    };
}
