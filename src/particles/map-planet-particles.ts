import { Color3, Color4, Mesh, MeshBuilder, ParticleSystem, Scene, Texture } from '@babylonjs/core';

export default class MapPlanetParticles extends ParticleSystem {
    public readonly fountain: Mesh;

    constructor(readonly scene: Scene, readonly color: Color3, readonly size: number) {
        super('Map Planet Particles', 3, scene);
        this.particleTexture = new Texture('textures/hollow-flare.png', scene);
        this.fountain = MeshBuilder.CreateBox('Map Planet Fountain', { size: 50 });
        this.fountain.isVisible = false;
        this.isLocal = true;
        this.emitter = this.fountain;
        this.emitRate = 2;
        this.minSize = size;
        this.maxSize = size;
        this.minLifeTime = 1;
        this.maxLifeTime = 1;
        this.addSizeGradient(0, size - size / 6);
        this.addSizeGradient(1, size);
        this.addColorGradient(0, Color4.FromColor3(color, 0));
        this.addColorGradient(0.5, Color4.FromColor3(color, 1));
        this.addColorGradient(1, Color4.FromColor3(color, 0));
        this.blendMode = ParticleSystem.BLENDMODE_ADD;
    }
}
