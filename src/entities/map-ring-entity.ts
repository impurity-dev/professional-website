import { Mesh, MeshBuilder, Scene, Space, TransformNode, Vector3 } from '@babylonjs/core';

export default class MapRingEntity extends TransformNode {
    public readonly sphere: Mesh;

    constructor(private readonly scene: Scene, radius: number, path: Array<Vector3>) {
        super('MapRing');
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
        ring.parent = this;
    }
}
