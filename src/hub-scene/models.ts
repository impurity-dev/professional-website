import * as BABYLON from '@babylonjs/core';
import * as materials from './materials';

export const portal = (props: { scene: BABYLON.Scene; texture: BABYLON.Texture }) => {
    const { scene, texture } = props;
    const parent = new BABYLON.TransformNode('portal', scene);
    parent.position = new BABYLON.Vector3(-10, 0, 0);
    const gl = new BABYLON.GlowLayer('glow', scene, {
        mainTextureSamples: 4,
        mainTextureFixedSize: 256,
        blurKernelSize: 100,
    });
    const right = BABYLON.MeshBuilder.CreateBox('right', { height: 1, width: 0.1, depth: 0.1 }, scene);
    const top = BABYLON.MeshBuilder.CreateBox('top', { height: 1, width: 0.1, depth: 0.1 }, scene);
    const left = BABYLON.MeshBuilder.CreateBox('left', { height: 1, width: 0.1, depth: 0.1 }, scene);
    right.translate(new BABYLON.Vector3(0, 0, 1), 0.45);
    top.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
    top.translate(new BABYLON.Vector3(0, 0, 1), 0.45);
    left.translate(new BABYLON.Vector3(0, 0, 1), -0.45);
    gl.addIncludedOnlyMesh(right);
    gl.addIncludedOnlyMesh(top);
    gl.addIncludedOnlyMesh(left);
    const neonMaterial = new BABYLON.StandardMaterial('neonMaterial', scene);
    neonMaterial.emissiveColor = new BABYLON.Color3(0.35, 0.96, 0.88);
    right.material = neonMaterial;
    right.parent = parent;
    top.material = neonMaterial;
    top.parent = parent;
    left.material = neonMaterial;
    left.parent = parent;

    const plane: BABYLON.Mesh = BABYLON.MeshBuilder.CreatePlane('plane', { size: 1 }, scene);
    plane.parent = parent;
    plane.rotate(new BABYLON.Vector3(0, 1, 0), (3 * Math.PI) / 2);
    plane.material = materials.ripple({ scene, texture });
    return parent;
};
