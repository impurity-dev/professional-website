import { ParticleSystem, Scene, Vector3, Texture, Mesh, Color4 } from '@babylonjs/core';
import { randomColor, randomNumberBetween } from '../utils';

export default class GasCloudParticles extends ParticleSystem {
    public readonly fountain: Mesh;

    constructor(private readonly scene: Scene) {
        super('GasClouds', 2500, scene);
        const fogTexture = new Texture('https://raw.githubusercontent.com/aWeirdo/Babylon.js/master/smoke_15.png', scene);
        this.fountain = Mesh.CreateBox('GasCloudsFountain', 0.01, scene);
        this.fountain.visibility = 0;
        this.minEmitBox = new Vector3(-100, -100, 100);
        this.maxEmitBox = new Vector3(100, 100, 100);
        this.particleTexture = fogTexture.clone();
        this.emitter = this.fountain;
        this.minSize = 35;
        this.maxSize = 100;
        this.minLifeTime = 10;
        this.maxLifeTime = 20;
        this.blendMode = ParticleSystem.BLENDMODE_STANDARD;
        this.gravity = new Vector3(0, 0, 0);
        this.direction1 = new Vector3(0, 0, -1);
        this.direction2 = new Vector3(0, 0, -1);
        this.minAngularSpeed = -2;
        this.maxAngularSpeed = 2;
        this.minEmitPower = 50;
        this.maxEmitPower = 100;
        this.updateSpeed = 0.05;
        this.setColorsAndEmit();
        setInterval(() => this.setColorsAndEmit(), 50 * randomNumberBetween(100, 200));
    }

    private setColorsAndEmit(): void {
        this.color1 = randomColor(null, null, null, 0.5);
        this.color2 = randomColor(null, null, null, 1);
        this.colorDead = randomColor(null, null, null, 0);
        this.manualEmitCount = randomNumberBetween(10, 75);
    }
}
