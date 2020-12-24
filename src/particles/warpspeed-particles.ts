import { Color4, ParticleSystem, Scene, Texture, Vector3 } from '@babylonjs/core';

export default class WarpSpeedParticles extends ParticleSystem {
    constructor(readonly scene: Scene, radius: number, height: number, rotationAxis: Vector3, rotationAmount: number) {
        super('WarpSpeed', 5000, scene);
        this.particleTexture = new Texture('textures/square.png', scene);
        this.minLifeTime = 2;
        this.maxLifeTime = 2;
        this.blendMode = ParticleSystem.BILLBOARDMODE_STRETCHED;
        this.gravity = new Vector3(0, 0, 0);
        this.minEmitPower = 750;
        this.maxEmitPower = 750;
        this.updateSpeed = 0.05;
        this.emitRate = 2000;
        this.preWarmCycles = 10;
        this.preWarmStepOffset = 50;
        this.minSize = 1;
        this.maxSize = 1;
        this.color1 = new Color4(1, 1, 1, 1);
        this.color2 = new Color4(1, 1, 1, 1);
        this.createDirectedCylinderEmitter(radius, height, 0, new Vector3(0, 1, 0), new Vector3(0, 1, 0));
    }

    public toggleWarp(): void {
        this.emitRate = 2000;
        this.minLifeTime = 1;
        this.maxLifeTime = 1.5;
        this.minEmitPower = 500;
        this.maxEmitPower = 1000;
    }
}
