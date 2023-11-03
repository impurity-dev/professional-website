import { Color4, ParticleSystem, Scene, Texture, Vector3 } from '@babylonjs/core';

export class WarpspeedCloudParticles extends ParticleSystem {
    private isWarping: boolean = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private emitHandler: any;

    constructor(
        readonly scene: Scene,
        radius: number,
        height: number,
    ) {
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
        this.emitHandler = setInterval(() => (this.manualEmitCount = 500), 400);
    }

    public stop(stopSubEmitters?: boolean): void {
        super.stop(stopSubEmitters);
        clearInterval(this.emitHandler);
        this.emitHandler = 0;
    }
}
