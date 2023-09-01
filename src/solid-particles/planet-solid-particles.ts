import { MeshBuilder, Scene, SolidParticle, SolidParticleSystem, Vector3, Texture, Color3 } from '@babylonjs/core';
import { LavaMaterial } from '@babylonjs/materials';

export default class PlanetSolidParticles extends SolidParticleSystem {
    public speed = 1;
    public recycleDepth: number = 1;

    constructor(readonly scene: Scene) {
        super('PlanetSolidParticles', scene);

        const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 50 });
        this.addShape(sphere, 1);
        sphere.dispose();

        const mesh = this.buildMesh();
        const lavaMaterial = new LavaMaterial('Lava', this.scene);
        lavaMaterial.noiseTexture = new Texture('https://www.babylonjs-playground.com/textures/lava/cloud.png', this.scene); // Set the bump texture
        lavaMaterial.diffuseTexture = new Texture('https://www.babylonjs-playground.com/textures/lava/lavatile.jpg', this.scene); // Set the diffuse texture
        lavaMaterial.speed = 0.25;
        lavaMaterial.fogColor = new Color3(0.5, 0, 0);
        mesh.material = lavaMaterial;
    }

    public set emitter(position: Vector3) {
        this.mesh.position = position;
    }

    public start(): void {
        this.initParticles();
        this.setParticles();
        this.scene.onAfterRenderObservable.add(() => {
            this.setParticles();
        });
    }

    public updateParticle(particle: SolidParticle): SolidParticle {
        if (particle.position.z < this.recycleDepth) {
            this.recycleParticle(particle);
        }
        const speed = new Vector3(0, 0, particle.velocity.z - this.speed);
        particle.position = particle.position.add(speed);

        return particle;
    }

    public initParticles(): void {
        for (let p = 0; p < this.nbParticles; p++) {
            this.recycleParticle(this.particles[p]);
        }
    }

    public recycleParticle(particle: SolidParticle): SolidParticle {
        particle.position = new Vector3(particle.position.x, particle.position.y, this.mesh.position.z);
        // particle.color = new Color4(Math.random(), Math.random(), Math.random(), 1);
        return particle;
    }
}
