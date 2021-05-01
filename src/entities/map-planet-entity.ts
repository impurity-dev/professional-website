import { Color3, Engine, GlowLayer, Material, Mesh, ParticleSystem, Scene, StandardMaterial, TransformNode } from '@babylonjs/core';
import MapPlanetParticles from '../particles/map-planet-particles';

export default class MapPlanetEntity extends TransformNode {
    public readonly sphere: Mesh;
    private readonly segments = 100;

    constructor(readonly scene: Scene, readonly innerDiameter: number, readonly outerDiameter: number, readonly color: Color3) {
        super('Map Planet');
        const glowLayer = new GlowLayer('Map Planet Glow Layer', scene);

        const innerSphere: Mesh = Mesh.CreateSphere('Inner Planet Map Sphere', this.segments, innerDiameter, scene);
        innerSphere.material = this.innterSphereMateral;
        innerSphere.parent = this;

        const mapPlanetParticles: ParticleSystem = new MapPlanetParticles(scene, color, outerDiameter);
        mapPlanetParticles.emitter = innerSphere;
        mapPlanetParticles.start();

        glowLayer.addIncludedOnlyMesh(innerSphere);
    }

    get innterSphereMateral(): Material {
        const material = new StandardMaterial('Inner Planet Map Sphere Material', this.scene);
        material.alphaMode = Engine.ALPHA_COMBINE;
        material.disableLighting = true;
        material.emissiveColor = this.color;
        return material;
    }
}
