import { Color3, Engine, GlowLayer, Material, Mesh, ParticleSystem, Scene, StandardMaterial, TransformNode } from '@babylonjs/core';
import MapPlanetParticles from '../particles/map-planet-particles.js';

export default class MapSunEntity extends TransformNode {
    public readonly sphere: Mesh;
    private readonly segments = 100;

    constructor(
        readonly scene: Scene,
        readonly innerDiameter: number,
        readonly outerDiameter: number,
        readonly color: Color3,
    ) {
        super('Map Sun');
        const glowLayer = new GlowLayer('Map Planet Glow Layer', scene);

        this.sphere = Mesh.CreateSphere('Inner Planet Map Sphere', this.segments, innerDiameter, scene);
        this.sphere.material = this.innterSphereMateral;
        this.sphere.parent = this;

        const mapPlanetParticles: ParticleSystem = new MapPlanetParticles(scene, color, outerDiameter);
        mapPlanetParticles.emitter = this.sphere;
        mapPlanetParticles.preWarmCycles = 10;
        mapPlanetParticles.preWarmStepOffset = 10;
        mapPlanetParticles.start();

        glowLayer.addIncludedOnlyMesh(this.sphere);
    }

    get innterSphereMateral(): Material {
        const material = new StandardMaterial('Inner Sun Map Sphere Material', this.scene);
        material.alphaMode = Engine.ALPHA_COMBINE;
        material.disableLighting = true;
        material.emissiveColor = this.color;
        return material;
    }
}
