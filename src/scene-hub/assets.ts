import * as BABYLON from '@babylonjs/core';
import { AssetFactory, ContainerNodeAsset } from '../managers/asset-factory';

export const SPACECOLONY_ASSET: ContainerNodeAsset = { type: 'container', file: 'space_colony_modular_kit_bash_4k.glb', directory: 'assets/space-colony/' };
export const spacecolony = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(SPACECOLONY_ASSET);
export const straightTunnel = (props: { assetFactory: AssetFactory }) => new StraightTunnel(props);

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

// Cube.013,Cube.026,Cube.010,Cube.062,Cube.108,Cube.112,Cube.061,Cube.001,Cube.167,Cube.039,Cube.058,Cylinder.008,Cube.326,Cube.175,Cylinder.014,Pipe_Corner,Cylinder.013,Cylinder.015,Pipe_Corner.001,Cube.334,Cube.336,Cube.337,Cube.678,Cube.688,Cube.689,Cube.1315,Cube.1322,Cube.1323,Cube.1325,Cube.1329,Cube.1411,Cube.1420,Cube.738,Cube.002,Cube.117,Cube.712,Cube.736,Cube.053,Cube.681,Cube.1808,Cube.1809,Cube.1810,Cube.1811,Cube.1816,Cube.1817,Cube.718,Cube.971,Cube.722,Cube.1834,Cube.017,Cube.014,Cube.1849,Cube.1850,Cube.173,Cube.735,Cube.168,Cube.701,Cube.924,Cube.1853,Cube.1871,Cube.1872,Cube.1873,Cube.1874,Cube.1875,Cube.1876,Cube.737,Circle.018,Circle.021,Circle.022,Cube.331,Cube.1919,Cube.1920,Cube.1921,Cube.1922,Cube.1923,Cube.1924,Cube.1925,Cube.1926,Cylinder.044,Cylinder.034,Cylinder.046,Pipe_Corner.004,Cylinder.047,Cylinder.048,Pipe_Corner.008,Cylinder.049,Cylinder.055,Cylinder.056,Cylinder.057,Cube.1931,Cube.1932,Cube.1933,Cube.1934,Cube.1935,Cube.1936,Cube.1937,Cube.1955,Cube.1956,Cube.1957,Cube.1959,Plane.030,Plane.031,Plane.032,Plane.033,Plane.034,Circle.024,Cube.856,Cube.1930,Cube.1984,Cube.1992,Plane.017,Plane.018,Cube.1994,Cube.2005,Cube.2056,Cube.2057,Cube.2324,Cube.2325,Cube.2326,Cube.2508,Cube.2512,Cube.2780,Cube.2813,Cube.3248,Cube.3521,Cube.3525,Cube.3558,Cylinder.074,Cylinder.075,Cylinder.076,Cylinder.077,Cylinder.078,Cylinder.079,Cylinder.080,Cylinder.081,Cylinder.082,Cylinder.083,Cylinder.084,Cylinder.085,Cylinder.093,Cylinder.109,Cylinder.098,Cylinder.099,Cube.3559,Cube.3560,Cube.3561,Cube.3569,Text,Cube.3590,Cube.3591,Cube.3592,Cube.3593,Cube.3594,Cube.3595,Cube.3596,Cube.3597,Cube.3598,Cube.3599,Cube.3600,Cube.3601,Cube.3602,Cube.3603,Cube.3604,Cube.3605,Cube.3606,Cube.3607,Cube.3608,Cube.3609,Cube.3610,Cube.3611,Cube.3612,Cube.3613,Cube.3614,Cube.3615,Cube.3616,Cube.3617,Cube.3618,Cube.3619,Cube.3620,Cube.3621,Cube.3622,Cube.3623,Cube.3624,Cube.3625,Cube.3626,Cube.1890,Cylinder,Cube.907,Cylinder.063,Cube.244,Cube.268,Cube.386,Cube.2028,Cube.2031
