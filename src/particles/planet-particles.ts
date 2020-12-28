import { Color4, MeshBuilder, Scalar, Scene, SolidParticle, SolidParticleSystem, Vector3 } from '@babylonjs/core';

export default class PlanetParticles extends SolidParticleSystem {
    public speed = 1;
    public recycleDepth: number = 1;

    public set emitter(position: Vector3) {
        this.mesh.position = position;
    }

    constructor(readonly scene: Scene) {
        super('PlanetParticles', scene);

        const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 50 });
        this.addShape(sphere, 1);
        sphere.dispose();

        this.buildMesh();
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
        particle.color = new Color4(Math.random(), Math.random(), Math.random(), 1);
        return particle;
    }
}
