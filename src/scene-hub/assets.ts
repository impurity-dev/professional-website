import * as BABYLON from '@babylonjs/core';
import { AssetFactory, ContainerNodeAsset } from '../managers/asset-factory';

export const test = (props: { assetFactory: AssetFactory }) => new Test(props);

export const SPACECOLONY_ASSET: ContainerNodeAsset = { type: 'container', file: 'space_colony_modular_kit_bash_4k.glb', directory: 'assets/space-colony/' };
export const spacecolony = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(SPACECOLONY_ASSET);
export const straightTunnel = (props: { assetFactory: AssetFactory }) => new StraightTunnel(props);
export const elbowTunnel = (props: { assetFactory: AssetFactory }) => new ElbowTunnel(props);
export const crossTunnel = (props: { assetFactory: AssetFactory }) => new CrossTunnel(props);
export const endTunnel = (props: { assetFactory: AssetFactory }) => new EndTunnel(props);

const DEFAULT_ASSETS = ['__root__', 'Sketchfab_model', '2406db62e15140269797e8f9e53b67dd.fbx', 'RootNode'];
class StraightTunnel extends BABYLON.TransformNode {
    constructor(props: { assetFactory: AssetFactory }) {
        const { assetFactory } = props;
        super('straight-tunnel', assetFactory.scene, true);
        const asset = props.assetFactory.getContainer(SPACECOLONY_ASSET, [...DEFAULT_ASSETS, 'Circle.018', 'Circle.018_Texture_Atlas1_0']);
        const mesh = asset.getChildMeshes().find((m) => m.name === 'Circle.018_Texture_Atlas1_0');
        mesh.parent = this;
        mesh.rotationQuaternion = null;
        mesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
        asset.dispose();
    }
}

class ElbowTunnel extends BABYLON.TransformNode {
    constructor(props: { assetFactory: AssetFactory }) {
        const { assetFactory } = props;
        super('elbow-tunnel', assetFactory.scene, true);
        const asset = props.assetFactory.getContainer(SPACECOLONY_ASSET, [...DEFAULT_ASSETS, 'Circle.021', 'Circle.021_Texture_Atlas1_0']);
        const mesh = asset.getChildMeshes().find((m) => m.name === 'Circle.021_Texture_Atlas1_0');
        mesh.parent = this;
        mesh.rotationQuaternion = null;
        mesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
        asset.dispose();
    }
}

class CrossTunnel extends BABYLON.TransformNode {
    constructor(props: { assetFactory: AssetFactory }) {
        const { assetFactory } = props;
        super('cross-tunnel', assetFactory.scene, true);
        const asset = props.assetFactory.getContainer(SPACECOLONY_ASSET, [...DEFAULT_ASSETS, 'Circle.022', 'Circle.022_Texture_Atlas1_0']);
        const mesh = asset.getChildMeshes().find((m) => m.name === 'Circle.022_Texture_Atlas1_0');
        mesh.parent = this;
        mesh.rotationQuaternion = null;
        mesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
        asset.dispose();
    }
}

class EndTunnel extends BABYLON.TransformNode {
    constructor(props: { assetFactory: AssetFactory }) {
        const { assetFactory } = props;
        super('end-tunnel', assetFactory.scene, true);
        const asset = props.assetFactory.getContainer(SPACECOLONY_ASSET, [...DEFAULT_ASSETS, 'Circle.024', 'Circle.024_Texture_Atlas1_0']);
        const mesh = asset.getChildMeshes().find((m) => m.name === 'Circle.024_Texture_Atlas1_0');
        mesh.parent = this;
        mesh.rotationQuaternion = null;
        mesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
        asset.dispose();
    }
}

class Test extends BABYLON.TransformNode {
    constructor(props: { assetFactory: AssetFactory }) {
        const { assetFactory } = props;
        super('straight-tunnel', assetFactory.scene, true);
        const asset = props.assetFactory.getContainer(SPACECOLONY_ASSET, [...DEFAULT_ASSETS, 'Cube.001', 'Cube.001_Texture_Atlas1_0']);
        const mesh = asset.getChildMeshes().find((m) => m.name === 'Cube.001_Texture_Atlas1_0');
        // mesh.parent = this;
        // mesh.rotationQuaternion = null;
        // mesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
        asset.dispose();
    }
}
