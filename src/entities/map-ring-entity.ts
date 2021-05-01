import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, TransformNode, Vector3 } from '@babylonjs/core';

export default class MapRingEntity extends TransformNode {
    public readonly sphere: Mesh;

    constructor(private readonly scene: Scene, radius: number, path: Array<Vector3>) {
        super('Map Ring');
        const ring: Mesh = MeshBuilder.CreateTube(
            'Map Ring Tube',
            {
                path: path,
                radius: radius,
                sideOrientation: Mesh.DOUBLESIDE,
                tessellation: 200,
            },
            this.scene,
        );
        ring.material = this.ringMaterial;
        ring.parent = this;
    }

    get ringMaterial(): StandardMaterial {
        const material = new StandardMaterial('Map Ring Material', this.scene);
        material.disableLighting = true;
        material.emissiveColor = new Color3(1, 1, 1);
        return material;
    }
}
