import * as BABYLON from '@babylonjs/core';
import { AssetFactory, AssetNode, ContainerNodeAsset } from '../nodes/nodes';

export const FIGHTER_ASSET: ContainerNodeAsset = { type: 'container', file: 'fighter.glb', directory: 'assets/fighter/' };
export const fighter = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FIGHTER_ASSET);

export const PROPSBASE_ASSET: ContainerNodeAsset = { type: 'container', file: 'Props_Base.gltf', directory: 'assets/environment/' };
export const propsBase = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(PROPSBASE_ASSET);

export const ROOFEMPTY_ASSET: ContainerNodeAsset = { type: 'container', file: 'RoofTile_Empty.gltf', directory: 'assets/environment/' };
export const roofEmpty = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(ROOFEMPTY_ASSET);

export const FLOORBASIC1_ASSET: ContainerNodeAsset = { type: 'container', file: 'FloorTile_Basic.gltf', directory: 'assets/environment/' };
export const floorBasic1 = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(FLOORBASIC1_ASSET);

export const DOORDOUBLE_WALL_SIDEA: ContainerNodeAsset = { type: 'container', file: 'DoorDouble_Wall_SideA.gltf', directory: 'assets/environment/walls/' };
export const doorDoubleWallSideA = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(DOORDOUBLE_WALL_SIDEA);

export const DOORDOUBLE_WALL_SIDEB: ContainerNodeAsset = { type: 'container', file: 'DoorDouble_Wall_SideB.gltf', directory: 'assets/environment/walls/' };
export const doorDoubleWallSideB = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(DOORDOUBLE_WALL_SIDEB);

export const doorDoubleWall = (props: { assetFactory: AssetFactory }): DoorDoubleWall => new DoorDoubleWall(props);
export class DoorDoubleWall extends BABYLON.TransformNode {
    readonly sideA: AssetNode;
    readonly sideB: AssetNode;
    readonly doors: DoorDouble;

    constructor(props: { assetFactory: AssetFactory }) {
        const { assetFactory } = props;
        super('door-double-wall', assetFactory.scene, true);
        this.doors = doorDouble({ assetFactory });
        this.sideA = doorDoubleWallSideA({ assetFactory });
        this.sideB = doorDoubleWallSideB({ assetFactory });
        this.doors.parent = this;
        this.sideA.parent = this;
        this.sideB.parent = this;
        this.sideA.position = new BABYLON.Vector3(0, 0, -1);
        this.sideA.rotation = new BABYLON.Vector3(0, Math.PI, 0);
    }
}

export const DOOR_DOUBLE: ContainerNodeAsset = { type: 'container', file: 'Door_Double.gltf', directory: 'assets/environment/' };
export const doorDouble = (props: { assetFactory: AssetFactory }) => new DoorDouble(props);
export class DoorDouble extends BABYLON.TransformNode {
    readonly leftDoor: BABYLON.TransformNode;
    readonly rightDoor: BABYLON.TransformNode;
    private readonly door: AssetNode;
    private readonly TRANSITION_SPEED = 0.35;
    private readonly scene: BABYLON.Scene;

    constructor(props: { assetFactory: AssetFactory }) {
        const { assetFactory } = props;
        super('door-double', assetFactory.scene, true);
        this.scene = assetFactory.scene;
        this.door = assetFactory.getContainer(DOOR_DOUBLE);
        this.door.collidable = true;
        this.door.parent = this;
        const openLeft = new BABYLON.Animation('openLeftDoorDoubleAnimation', 'position.x', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        const keys = [
            {
                frame: 0,
                value: 0,
            },
            {
                frame: 5,
                value: 0.02,
            },
            {
                frame: 8,
                value: 0.02,
            },
            {
                frame: 10,
                value: 0.05,
            },
            {
                frame: 60,
                value: 1.5,
            },
        ];
        openLeft.setKeys(keys.map(({ frame, value }) => ({ frame, value: -value })));
        const openRight = new BABYLON.Animation('openRightDoorDoubleAnimation', 'position.x', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        openRight.setKeys(keys);

        this.getChildMeshes().forEach((m) => {
            if (!m.isAnInstance) m.receiveShadows = true;
            m.checkCollisions = true;
        });
        this.leftDoor = this.getChildTransformNodes().find((n) => n.name === 'Door_Double.L');
        this.rightDoor = this.getChildTransformNodes().find((n) => n.name === 'Door_Double.R');
        this.leftDoor.animations.push(openLeft);
        this.rightDoor.animations.push(openRight);
    }

    openAsync = async (isOpen: boolean) => {
        const { leftDoor, rightDoor, TRANSITION_SPEED } = this;
        if (isOpen) {
            return Promise.all([
                this.scene.beginAnimation(leftDoor, 0, 60, false, TRANSITION_SPEED).waitAsync(),
                this.scene.beginAnimation(rightDoor, 0, 60, false, TRANSITION_SPEED).waitAsync(),
            ]);
        }
        return Promise.all([
            this.scene.beginAnimation(leftDoor, 60, 0, false, TRANSITION_SPEED).waitAsync(),
            this.scene.beginAnimation(rightDoor, 60, 0, false, TRANSITION_SPEED).waitAsync(),
        ]);
    };
}

export const WALLPIPES_ASSET: ContainerNodeAsset = { type: 'container', file: 'Pipes.gltf', directory: 'assets/environment/walls/' };
export const wallPipes = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(WALLPIPES_ASSET);

export const COLUMNSLIM_ASSET: ContainerNodeAsset = { type: 'container', file: 'Column_Slim.gltf', directory: 'assets/environment/' };
export const columnSlim = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(COLUMNSLIM_ASSET);

export const COLUMN1_ASSET: ContainerNodeAsset = { type: 'container', file: 'Column_1.gltf', directory: 'assets/environment/' };
export const column1 = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(COLUMN2_ASSET);

export const COLUMN2_ASSET: ContainerNodeAsset = { type: 'container', file: 'Column_2.gltf', directory: 'assets/environment/' };
export const column2 = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(COLUMN2_ASSET);

export const COLUMN3_ASSET: ContainerNodeAsset = { type: 'container', file: 'Column_3.gltf', directory: 'assets/environment/' };
export const column3 = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(COLUMN3_ASSET);

export const WALL1_ASSET: ContainerNodeAsset = { type: 'container', file: 'Wall_1.gltf', directory: 'assets/environment/walls/' };
export const wall1 = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(WALL1_ASSET);

export const WALL2_ASSET: ContainerNodeAsset = { type: 'container', file: 'Wall_2.gltf', directory: 'assets/environment/walls/' };
export const wall2 = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(WALL2_ASSET);

export const WALL3_ASSET: ContainerNodeAsset = { type: 'container', file: 'Wall_3.gltf', directory: 'assets/environment/walls/' };
export const wall3 = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(WALL3_ASSET);

export const WALL4_ASSET: ContainerNodeAsset = { type: 'container', file: 'Wall_4.gltf', directory: 'assets/environment/walls/' };
export const wall4 = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(WALL4_ASSET);

export const WALL5_ASSET: ContainerNodeAsset = { type: 'container', file: 'Wall_5.gltf', directory: 'assets/environment/walls/' };
export const wall5 = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(WALL5_ASSET);

export const WALLEMPTY_ASSET: ContainerNodeAsset = { type: 'container', file: 'Wall_Empty.gltf', directory: 'assets/environment/walls/' };
export const wallEmpty = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(WALLEMPTY_ASSET);

export const WINDOWWALLSIDEA_ASSET: ContainerNodeAsset = { type: 'container', file: 'Window_Wall_SideA.gltf', directory: 'assets/environment/walls/' };
export const windowWallSideA = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(WINDOWWALLSIDEA_ASSET);

export const WINDOWWALLSIDE_ASSETB: ContainerNodeAsset = { type: 'container', file: 'Window_Wall_SideB.gltf', directory: 'assets/environment/walls/' };
export const windowWallSideB = (props: { assetFactory: AssetFactory }) => props.assetFactory.getContainer(WINDOWWALLSIDE_ASSETB);

export const wall = (props: WallProps) => new Wall(props);
type Creator = (props: { assetFactory: AssetFactory }) => AssetNode;
export type WallProps = { assetFactory: AssetFactory; pole: Creator; wall: Creator; pipes: Creator };
export class Wall extends BABYLON.TransformNode {
    readonly wall: AssetNode;
    readonly pole: AssetNode;
    readonly pipes: AssetNode;

    constructor(props: WallProps) {
        const { assetFactory, wall, pole, pipes } = props;
        super('wall', assetFactory.scene, true);
        this.wall = wall({ assetFactory });
        this.pole = pole({ assetFactory });
        this.pipes = pipes({ assetFactory });
        this.wall.parent = this;
        this.pole.parent = this;
        this.pipes.parent = this;
        this.pole.translate(new BABYLON.Vector3(1, 0, 0), -2);
    }
}
