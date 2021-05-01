import { Mesh, MeshBuilder, Scene, TransformNode, StandardMaterial, Material, Engine, Color3, GlowLayer } from '@babylonjs/core';

export default class MapPlanetEntity extends TransformNode {
    public readonly sphere: Mesh;
    private readonly segments = 100;

    constructor(readonly scene: Scene, readonly innerDiameter: number, readonly outerDiameter: number, readonly color: Color3) {
        super('Planet');
        const glowLayer = new GlowLayer('Map Planet Glow Layer', scene);

        const innerSphere: Mesh = Mesh.CreateSphere('Inner Planet Map Sphere', this.segments, innerDiameter, scene);
        innerSphere.material = this.innterSphereMateral;
        innerSphere.parent = this;

        const outerSphere: Mesh = MeshBuilder.CreateSphere(
            'Outer Planet Map Sphere',
            { segments: this.segments, diameter: outerDiameter },
            scene,
        );
        outerSphere.material = this.outerSphereMateral;
        outerSphere.parent = this;

        glowLayer.addIncludedOnlyMesh(innerSphere);
    }

    get innterSphereMateral(): Material {
        const material = new StandardMaterial('Outer Planet Map Sphere Material', this.scene);
        material.alphaMode = Engine.ALPHA_COMBINE;
        material.disableLighting = true;
        // material.ambientColor = this.color;
        material.emissiveColor = this.color;
        // material.diffuseColor = this.color;
        // material.specularColor = this.color;
        return material;
    }

    get outerSphereMateral(): Material {
        const material = new StandardMaterial('Outer Planet Map Sphere Material', this.scene);
        material.alpha = 0.5;
        material.alphaMode = Engine.ALPHA_COMBINE;
        material.disableLighting = true;
        material.ambientColor = this.color;
        material.emissiveColor = this.color;
        material.diffuseColor = this.color;
        material.specularColor = this.color;
        return material;
    }
}
