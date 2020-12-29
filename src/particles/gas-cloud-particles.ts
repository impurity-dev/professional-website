import { Color4, ParticleSystem, Scene, Texture, Vector3 } from '@babylonjs/core';
import { randomColor, randomIntBetween } from '../utils';

export default class GasCloudParticles extends ParticleSystem {
    constructor(readonly scene: Scene, radius: number, direction1: Vector3, direction2: Vector3) {
        super('GasCloudParticles', 2500, scene);
        const fogTexture = new Texture('https://raw.githubusercontent.com/aWeirdo/Babylon.js/master/smoke_15.png', scene);
        this.particleEmitterType = this.createDirectedSphereEmitter(radius, direction1, direction2);
        this.particleTexture = fogTexture.clone();
        this.minLifeTime = 20;
        this.maxLifeTime = 30;
        this.blendMode = ParticleSystem.BLENDMODE_STANDARD;
        this.gravity = new Vector3(0, 0, 0);
        this.minAngularSpeed = -2;
        this.maxAngularSpeed = 2;
        this.minEmitPower = 50;
        this.maxEmitPower = 100;
        this.updateSpeed = 0.05;
        this.addSizeGradient(0, 0, 0);
        this.addSizeGradient(0.1, 50, 100);
        this.addSizeGradient(1, 100, 200);
        this.addAngularSpeedGradient(0, -2, 2);
        this.addAngularSpeedGradient(0.2, -1, 1);
        this.addAngularSpeedGradient(1, -0.5, 0.5);
        this.setColorsAndEmit();
    }

    public start(delay?: number): void {
        super.start(delay);
        setInterval(() => this.setColorsAndEmit(), 50 * randomIntBetween(100, 200));
    }

    private setColorsAndEmit(): void {
        this.removeColorGradient(0);
        this.removeColorGradient(0.1);
        this.removeColorGradient(0.8);
        this.removeColorGradient(1);
        const color1 = randomColor();
        const color2 = randomColor();
        this.addColorGradient(0, this.changeAlpha(color1, 0), this.changeAlpha(color2, 0));
        this.addColorGradient(0.1, this.changeAlpha(color1, 1), this.changeAlpha(color2, 1));
        this.addColorGradient(0.8, this.changeAlpha(color1, 0.8), this.changeAlpha(color2, 0.8));
        this.addColorGradient(1, this.changeAlpha(color1, 0.5), this.changeAlpha(color2, 0.5));
        this.manualEmitCount = randomIntBetween(10, 75);
    }

    private changeAlpha(color: Color4, alpha: number): Color4 {
        const newColor = color;
        newColor.a = alpha;
        return newColor;
    }
}
