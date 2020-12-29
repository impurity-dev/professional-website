import { Color4, ParticleSystem, Scene, Texture, Vector3 } from '@babylonjs/core';

export default class WarpspeedCloudParticles extends ParticleSystem {
    private isWarping: boolean = false;

    constructor(readonly scene: Scene, radius: number, height: number) {
        super('WarpspeedCloudParticles', 10_000, scene);
        this.particleTexture = new Texture('https://raw.githubusercontent.com/aWeirdo/Babylon.js/master/smoke_15.png', scene);
        this.minLifeTime = 2;
        this.maxLifeTime = 2;
        this.blendMode = ParticleSystem.BLENDMODE_STANDARD;
        this.minEmitPower = 400;
        this.maxEmitPower = 400;
        this.updateSpeed = 0.05;
        this.minSize = 10;
        this.maxSize = 10;
        this.emitRate = 0;
        this.addColorGradient(0, new Color4(0, 0, 1, 0.25));
        this.addColorGradient(0.25, new Color4(0, 1, 1, 0.5));
        this.addColorGradient(1, new Color4(1, 0, 1, 0));
        this.createDirectedCylinderEmitter(radius, height, 0, new Vector3(0, 1, 0), new Vector3(0, 1, 0));
    }

    public start(delay?: number): void {
        super.start(delay);
        setInterval(() => {
            this.manualEmitCount = 500;
        }, 400);
    }

    public toggleWarp(): void {
        this.isWarping = !this.isWarping;
        if (this.isWarping) {
            this.emitRate = 2000;
            this.minLifeTime = 2;
            this.maxLifeTime = 2;
            this.minEmitPower = 500;
            this.maxEmitPower = 500;
            this.reset();
        } else {
            this.emitRate = 500;
            this.minLifeTime = 10;
            this.maxLifeTime = 10;
            this.minEmitPower = 100;
            this.maxEmitPower = 100;
            this.reset();
        }
    }
}
