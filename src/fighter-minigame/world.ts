import * as BABYLON from '@babylonjs/core';
import * as models from '../entities/model';
import { EntityManager } from '../managers/entity-manager';
import { World } from '../shared/world';
import { fighter } from './fighter';
import { FighterEvents } from './events';

export class FighterWorld extends World {
    public readonly fighterModel: models.Model;

    constructor(props: { scene: BABYLON.Scene; entityManager: EntityManager; events: FighterEvents }) {
        const { scene, entityManager, events } = props;
        super(scene, entityManager);
        scene.collisionsEnabled = true;
        this.lights();
        this.fighterModel = this.ship({ scene, entityManager, events });
        this.particles();
    }

    private lights = () => {
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), this.scene);
        light.intensity = 0.3;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };

    private ship = (props: { scene: BABYLON.Scene; entityManager: EntityManager; events: FighterEvents }) => {
        const { scene, entityManager, events } = props;
        return fighter({ scene, entityManager, events });
    };

    private particles = () => {
        const { scene } = this;
        const system = new BABYLON.ParticleSystem('dust', 10000, scene);
        system.createSphereEmitter(10000, 1);
        system.billboardMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        system.particleTexture = new BABYLON.Texture('textures/square.png', scene);
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
}
