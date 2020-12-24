import { Color4, CylinderDirectedParticleEmitter, ParticleSystem, Scene, Texture, Vector3 } from '@babylonjs/core';

export default class WarpSpeedParticles extends ParticleSystem {
    public readonly cylinderEmitter: CylinderDirectedParticleEmitter;

    constructor(readonly scene: Scene, radius: number, height: number, radiusRange: number, direction1: Vector3, direction2: Vector3) {
        super('WarpSpeed', 5000, scene);
        this.cylinderEmitter = this.createDirectedCylinderEmitter(radius, height, radiusRange, direction1, direction2);
        this.particleTexture = new Texture('textures/square.png', scene);
        this.minLifeTime = 5;
        this.maxLifeTime = 30;
        this.blendMode = ParticleSystem.BLENDMODE_STANDARD;
        this.gravity = new Vector3(0, 0, 0);
        this.minEmitPower = 50;
        this.maxEmitPower = 100;
        this.updateSpeed = 0.05;
        this.emitRate = 10000;
        this.addSizeGradient(0, 0, 0);
        this.addSizeGradient(0.1, 0.5, 1);
        this.addSizeGradient(1, 0.5, 0);
        this.addAngularSpeedGradient(0, -2, 2);
        this.addAngularSpeedGradient(0.2, -1, 1);
        this.addAngularSpeedGradient(1, -0.5, 0.5);
        this.preWarmCycles = 10;
        this.preWarmStepOffset = 50;
        const color1 = new Color4(1, 1, 1, 1);
        const color2 = new Color4(1, 1, 1, 1);
        this.addColorGradient(0, this.changeAlpha(color1, 0), this.changeAlpha(color2, 0));
        this.addColorGradient(0.1, this.changeAlpha(color1, 1), this.changeAlpha(color2, 1));
        this.addColorGradient(0.8, this.changeAlpha(color1, 0.8), this.changeAlpha(color2, 0.8));
        this.addColorGradient(1, this.changeAlpha(color1, 0.5), this.changeAlpha(color2, 0.5));
    }

    public toggleWarp(): void {
        this.emitRate = 2000;
        this.minLifeTime = 1;
        this.maxLifeTime = 1.5;
        this.minEmitPower = 500;
        this.maxEmitPower = 1000;
    }

    private changeAlpha(color: Color4, alpha: number): Color4 {
        const newColor = color;
        newColor.a = alpha;
        return newColor;
    }
}
