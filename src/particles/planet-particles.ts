import { Color4, MeshBuilder, Scalar, Scene, SolidParticle, SolidParticleSystem, Vector3 } from '@babylonjs/core';

export default class PlanetParticles extends SolidParticleSystem {
    private speed = 5;

    constructor(readonly scene: Scene, position: Vector3) {
        super('PlanetParticles', scene);

        const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 50 });
        this.addShape(sphere, 1);
        sphere.dispose();

        const mesh = this.buildMesh();
        mesh.position = position;
    }

    public start(): void {
        this.initParticles();
        this.setParticles();
        this.scene.onAfterRenderObservable.add(() => {
            this.setParticles();
        });
    }

    public updateParticle(particle: SolidParticle): SolidParticle {
        if (particle.position.z < -650) {
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
