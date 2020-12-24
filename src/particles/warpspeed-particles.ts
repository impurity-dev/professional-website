import { ParticleSystem, Scene, Vector3, Texture, Mesh, Color4 } from '@babylonjs/core';

export default class WarpSpeedParticles extends ParticleSystem {
    public readonly fountain: Mesh;

    constructor(readonly scene: Scene) {
        super('WarpSpeed', 5000, scene);
        const fogTexture = new Texture('textures/square.png', scene);
        this.fountain = Mesh.CreateBox('WarpSpeedFountain', 0.01, scene);
        this.fountain.isVisible = false;
        this.minEmitBox = new Vector3(-200, -200, 200);
        this.maxEmitBox = new Vector3(200, 200, 200);
        this.particleTexture = fogTexture.clone();
        this.emitter = this.fountain;
        this.minLifeTime = 5;
        this.maxLifeTime = 30;
        this.blendMode = ParticleSystem.BLENDMODE_STANDARD;
        this.gravity = new Vector3(0, 0, 0);
        this.direction1 = new Vector3(0, 0, -1);
        this.direction2 = new Vector3(0, 0, -1);
        this.minAngularSpeed = -2;
        this.maxAngularSpeed = 2;
        this.minEmitPower = 50;
        this.maxEmitPower = 100;
        this.updateSpeed = 0.05;
        this.emitRate = 1000;
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
