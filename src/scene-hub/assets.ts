import * as BABYLON from '@babylonjs/core';
import { AssetFactory, ContainerNodeAsset } from '../managers/asset-factory';

const DEFAULT_ASSETS = ['__root__', 'Sketchfab_model', '2406db62e15140269797e8f9e53b67dd.fbx', 'RootNode'];
const build = (props: { name: string; meshName: string; assetFactory: AssetFactory }) => {
    const { name, meshName, assetFactory } = props;
    const transform = new BABYLON.TransformNode(name, assetFactory.scene, true);
    const asset = props.assetFactory.getContainer(SPACECOLONY_ASSET, [...DEFAULT_ASSETS, meshName, `${meshName}_Texture_Atlas1_0`]);
    const mesh = asset.getChildMeshes().find((m) => m.name === `${meshName}_Texture_Atlas1_0`);
    mesh.parent = this;
    mesh.rotationQuaternion = null;
    mesh.rotate(new BABYLON.Vector3(1, 0, 0), -Math.PI / 2);
    asset.dispose();
    return transform;
};
export const SPACECOLONY_ASSET: ContainerNodeAsset = { type: 'container', file: 'space_colony_modular_kit_bash_4k.glb', directory: 'assets/space-colony/' };
export const spacecolony = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(SPACECOLONY_ASSET);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TUNNELS
//
export const straightTunnel = (props: { assetFactory: AssetFactory }) => build({ name: 'straight-tunnel', meshName: 'Circle.018', ...props });
export const elbowTunnel = (props: { assetFactory: AssetFactory }) => build({ name: 'elbow-tunnel', meshName: 'Circle.021', ...props });
export const crossTunnel = (props: { assetFactory: AssetFactory }) => build({ name: 'cross-tunnel', meshName: 'Circle.022', ...props });
export const endTunnel = (props: { assetFactory: AssetFactory }) => build({ name: 'end-tunnel', meshName: 'Circle.024', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WALL TOPS
//
export const cornerWallTop = (props: { assetFactory: AssetFactory }) => build({ name: 'corner-wall-top', meshName: 'Cube.002', ...props });
export const tWallTop = (props: { assetFactory: AssetFactory }) => build({ name: 't-wall-top', meshName: 'Cube.053', ...props });
export const slimWallTop = (props: { assetFactory: AssetFactory }) => build({ name: 'slim-wall-top', meshName: 'Cube.117', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STRIPE WALL TOPS
//
export const tStripeWallTop = (props: { assetFactory: AssetFactory }) => build({ name: 't-stripe-wall-top', meshName: 'Cube.061', ...props });
export const doubleDoorStripeWallTop = (props: { assetFactory: AssetFactory }) => build({ name: 'doubledoor-stripe-wall-top', meshName: 'Cube.175', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STRIPE WALLS
//
export const middleStripeWall = (props: { assetFactory: AssetFactory }) => build({ name: 'middle-stripe-wall', meshName: 'Cube.010', ...props });
export const elbowStripeWall = (props: { assetFactory: AssetFactory }) => build({ name: 'elbow-stripe-wall', meshName: 'Cube.026', ...props });
export const doorwayStripeWall = (props: { assetFactory: AssetFactory }) => build({ name: 'doorway-stripe-wall', meshName: 'Cube.058', ...props });
export const windowStripeWall = (props: { assetFactory: AssetFactory }) => build({ name: 'window-stripe-wall', meshName: 'Cube.112', ...props });
export const fanStripeWall = (props: { assetFactory: AssetFactory }) => build({ name: 'fan-stripe-wall', meshName: 'Cube.1329', ...props });
export const slimStripeWall = (props: { assetFactory: AssetFactory }) => build({ name: 'slim-stripe-wall', meshName: 'Cube.1420', ...props });
export const tStripeWall = (props: { assetFactory: AssetFactory }) => build({ name: 't-stripe-wall', meshName: 'Cube.167', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RAILINGS
//
export const straightRailing = (props: { assetFactory: AssetFactory }) => build({ name: 'straight-railing', meshName: 'Cube.013', ...props });
export const elbowRailing = (props: { assetFactory: AssetFactory }) => build({ name: 'elbow-railing', meshName: 'Cube.017', ...props });
export const elbowTopRailing = (props: { assetFactory: AssetFactory }) => build({ name: 'elbow-top-railing', meshName: 'Cube.173', ...props });
export const straightTopRailing = (props: { assetFactory: AssetFactory }) => build({ name: 'straight-top-railing', meshName: 'Cube.1849', ...props });
export const postRailing = (props: { assetFactory: AssetFactory }) => build({ name: 'post-railing', meshName: 'Cube.1850', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// STAIRS
//
export const elbowStairs = (props: { assetFactory: AssetFactory }) => build({ name: 'elbow-stairs', meshName: 'Cube.014', ...props });
export const smallStraightStairs = (props: { assetFactory: AssetFactory }) => build({ name: 'small-straight-stairs', meshName: 'Cube.1834', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HALF WALLS
//
export const elbowHalfStripeWall = (props: { assetFactory: AssetFactory }) => build({ name: 'elbow-half-stripe-wall', meshName: 'Cube.039', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HALF WALLS
//
export const simpleFloor = (props: { assetFactory: AssetFactory }) => build({ name: 'simple-floor', meshName: 'Cube.062', ...props });
export const ribbedFloor = (props: { assetFactory: AssetFactory }) => build({ name: 'ribbed-floor', meshName: 'Cube.108', ...props });
export const blankFloor = (props: { assetFactory: AssetFactory }) => build({ name: 'blank-floor', meshName: 'Cube.1411', ...props });
export const smallFloor = (props: { assetFactory: AssetFactory }) => build({ name: 'small-floor', meshName: 'Cube.168', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PILLARS
//
export const yellowTallPillar = (props: { assetFactory: AssetFactory }) => build({ name: 'yellow-tall-pillar', meshName: 'Cube.1315', ...props });
export const yellowHalfPillar = (props: { assetFactory: AssetFactory }) => build({ name: 'yellow-half-pillar', meshName: 'Cube.1322', ...props });
export const blueTallPillar = (props: { assetFactory: AssetFactory }) => build({ name: 'blue-tall-pillar', meshName: 'Cube.1323', ...props });
export const blueHalfPillar = (props: { assetFactory: AssetFactory }) => build({ name: 'blue-half-pillar', meshName: 'Cube.1325', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEAMS
//
export const longBeam = (props: { assetFactory: AssetFactory }) => build({ name: 'long-beam', meshName: 'Cube.1808', ...props });
export const halfLongBeam = (props: { assetFactory: AssetFactory }) => build({ name: 'half-long-beam', meshName: 'Cube.1809', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CAGES
//
export const basicCage = (props: { assetFactory: AssetFactory }) => build({ name: 'basic-cage', meshName: 'Cube.1810', ...props });
export const shortBasicCage = (props: { assetFactory: AssetFactory }) => build({ name: 'short-basic-cage', meshName: 'Cube.1811', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ARCHES
//
export const straightArch = (props: { assetFactory: AssetFactory }) => build({ name: 'straight-arch', meshName: 'Cube.1816', ...props });
export const straightHalfArch = (props: { assetFactory: AssetFactory }) => build({ name: 'straight-half-arch', meshName: 'Cube.1817', ...props });
export const elbowArch = (props: { assetFactory: AssetFactory }) => build({ name: 'elbow-arch', meshName: 'Cube.1853', ...props });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TEST
//
export const test = (props: { assetFactory: AssetFactory }) => build({ name: 'test', meshName: 'Cube.1853', ...props });
