import { Color4, ParticleSystem, Scene, Texture, Vector2, Vector3 } from '@babylonjs/core';

export default class WarpSpeedParticles extends ParticleSystem {
    constructor(readonly scene: Scene, radius: number, height: number, rotationAxis: Vector3, rotationAmount: number) {
        super('WarpSpeed', 10_000, scene);
        this.particleTexture = new Texture('textures/square.png', scene);
        this.minLifeTime = 10;
        this.maxLifeTime = 10;
        this.blendMode = ParticleSystem.BLENDMODE_ONEONE;
        this.minEmitPower = 100;
        this.maxEmitPower = 100;
        this.updateSpeed = 0.05;
        this.emitRate = 500;
        this.preWarmCycles = 100;
        this.preWarmStepOffset = 5;
        this.minSize = 1;
        this.maxSize = 1;
        this.addColorGradient(0, new Color4(0, 0, 1, 0.5));
        this.addColorGradient(0.25, new Color4(0, 1, 1, 1));
        this.addColorGradient(1, new Color4(1, 0, 1, 0));
        this.createDirectedCylinderEmitter(radius, height, 0.5, new Vector3(0, 1, 0), new Vector3(0, 1, 0));
    }

    public toggleWarp(): void {
        this.emitRate = 2000;
        this.minLifeTime = 1;
        this.maxLifeTime = 1.5;
        this.minEmitPower = 500;
        this.maxEmitPower = 1000;
    }
}
