import * as BABYLON from '@babylonjs/core';
import * as localEvents from './events';
import * as assets from './assets';
import { AssetFactory } from '../managers/asset-factory';

export const world = (props: { assetFactory: AssetFactory; events: localEvents.Events }) => {
    const { assetFactory, events } = props;
    assetFactory.scene.collisionsEnabled = true;
    lights({ assetFactory });
    const fighter = ship({ assetFactory, events });
    particles({ assetFactory });
    return {
        fighter,
    };
};

const lights = (props: { assetFactory: AssetFactory }) => {
    const { assetFactory } = props;
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), assetFactory.scene);
    light.intensity = 0.3;
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);
};

const ship = (props: { assetFactory: AssetFactory; events: localEvents.Events }) => {
    const { assetFactory, events } = props;
    return assets.fighter({ assetFactory, events });
};

const particles = (props: { assetFactory: AssetFactory }) => {
    const { assetFactory } = props;
    const system = new BABYLON.ParticleSystem('dust', 10000, assetFactory.scene);
    system.createSphereEmitter(10000, 1);
    system.billboardMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    system.particleTexture = new BABYLON.Texture('textures/square.png', assetFactory.scene);
    system.color1 = new BABYLON.Color4(1, 0.8, 0.8, 1.0);
    system.color2 = new BABYLON.Color4(1, 1, 1, 1.0);
    system.minLifeTime = Number.MAX_VALUE;
    system.maxLifeTime = Number.MAX_VALUE;
    system.minEmitPower = 0;
    system.maxEmitPower = 0;
    system.minSize = 0.2;
    system.maxSize = 0.2;
    system.manualEmitCount = 100000;
    system.gravity = new BABYLON.Vector3(0, 0, 0);
    system.start();
};
