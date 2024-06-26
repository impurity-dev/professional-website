import * as BABYLON from '@babylonjs/core';
import { Asset, EntityManager } from '../managers/entity-manager';
import * as assets from '../assets';
import { Entity } from './entity';

type Metadata = Record<string, string>;
type ModelProps = { name: string; scene: BABYLON.Scene; entityManager: EntityManager; asset: Asset; metadata?: Metadata };
export class Model extends Entity {
    protected readonly onLoad: BABYLON.Observable<void> = new BABYLON.Observable();
    private _entries: BABYLON.InstantiatedEntries | undefined;

    constructor(private readonly props: ModelProps) {
        const { name, scene, entityManager, asset, metadata } = props;
        super({ name, scene });
        this.transform.metadata = metadata ? { ...asset, ...metadata } : asset;
        entityManager.queue(asset).add((task) => this.load(task));
    }

    get entries() {
        if (!this._entries) throw new Error('Model is unloaded');
        return this._entries;
    }
    private set entries(other: BABYLON.InstantiatedEntries) {
        this._entries = other;
    }

    addOnLoad = (callback: () => void) => this.onLoad.add(callback);

    protected load = (task: BABYLON.ContainerAssetTask) => {
        this.entries = task.loadedContainer.instantiateModelsToScene((n) => n, false, { doNotInstantiate: true });
        this.entries.rootNodes.forEach((node) => (node.parent = this.transform));
        this.transform.getChildMeshes().forEach((m) => {
            if (!m.isAnInstance) m.receiveShadows = true;
            m.checkCollisions = true;
            m.metadata = this.transform.metadata;
        });
        this.onLoad.notifyObservers();
    };
}
export type ModelFactory = (props: InitProps) => Model;
export type EntityFactory = (props: InitProps) => Entity;
export type InitProps = { scene: BABYLON.Scene; entityManager: EntityManager; metadata?: Metadata };
// Columns
export const column1 = (props: InitProps) => new Model({ ...props, name: 'column-1', asset: assets.COLUMN_1 });
export const column2 = (props: InitProps) => new Model({ ...props, name: 'column-2', asset: assets.COLUMN_2 });
export const column3 = (props: InitProps) => new Model({ ...props, name: 'column-3', asset: assets.COLUMN_3 });
export const columnSlim = (props: InitProps) => new Model({ ...props, name: 'column-slim', asset: assets.COLUMN_SLIM });
// Doors
export class DoorDouble extends Model {
    private left: BABYLON.TransformNode;
    private right: BABYLON.TransformNode;
    private openLeft: BABYLON.Animation;
    private openRight: BABYLON.Animation;

    constructor(props: InitProps) {
        super({ ...props, name: 'door-double', asset: assets.DOOR_DOUBLE });
        this.openLeft = new BABYLON.Animation('openLeftDoorDoubleAnimation', 'position.x', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
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
        this.openLeft.setKeys(keys.map(({ frame, value }) => ({ frame, value: -value })));
        this.openRight = new BABYLON.Animation('openRightDoorDoubleAnimation', 'position.x', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        this.openRight.setKeys(keys);
    }

    get leftDoor() {
        return this.left;
    }

    get rightDoor() {
        return this.right;
    }

    openAsync = async (isOpen: boolean) => {
        const speed = 0.35;
        if (isOpen) {
            return Promise.all([this.scene.beginAnimation(this.left, 0, 60, false, speed).waitAsync(), this.scene.beginAnimation(this.right, 0, 60, false, speed).waitAsync()]);
        } else {
            return Promise.all([this.scene.beginAnimation(this.left, 60, 0, false, speed).waitAsync(), this.scene.beginAnimation(this.right, 60, 0, false, speed).waitAsync()]);
        }
    };

    protected load = (task: BABYLON.ContainerAssetTask) => {
        const entries = task.loadedContainer.instantiateModelsToScene((n) => n, false, { doNotInstantiate: true });
        entries.rootNodes.forEach((node) => (node.parent = this.transform));
        this.transform.getChildMeshes().forEach((m) => {
            if (!m.isAnInstance) m.receiveShadows = true;
            m.checkCollisions = true;
        });
        this.transform.getChildTransformNodes().forEach((t) => {
            if (t.name === 'Door_Double.L') this.left = t as BABYLON.TransformNode;
            if (t.name === 'Door_Double.R') this.right = t as BABYLON.TransformNode;
        });
        this.left.animations.push(this.openLeft);
        this.right.animations.push(this.openRight);
        this.onLoad.notifyObservers();
    };
}
export const doorDouble = (props: InitProps) => new DoorDouble({ ...props });
export const doorSingle = (props: InitProps) => new Model({ ...props, name: 'door-single', asset: assets.DOOR_SINGLE });
// Floors
export const floorBasic1 = (props: InitProps) => new Model({ ...props, name: 'floor-basic-1', asset: assets.FLOORTILE_BASIC });
export const floorBasic2 = (props: InitProps) => new Model({ ...props, name: 'floor-basic-2', asset: assets.FLOORTILE_BASIC2 });
export const floorCorner = (props: InitProps) => new Model({ ...props, name: 'floor-corner', asset: assets.FLOORTILE_CORNER });
export const floorDoubleHallway = (props: InitProps) => new Model({ ...props, name: 'floor-double-hallway', asset: assets.FLOORTILE_DOUBLE_HALLWAY });
export const floorEmpty = (props: InitProps) => new Model({ ...props, name: 'floor-empty', asset: assets.FLOORTILE_EMPTY });
export const floorInnerCorner = (props: InitProps) => new Model({ ...props, name: 'floor-inner-corner', asset: assets.FLOORTILE_INNERCORNER });
export const floorSide = (props: InitProps) => new Model({ ...props, name: 'floor-side', asset: assets.FLOORTILE_SIDE });
// Props
export const propsBase = (props: InitProps) => new Model({ ...props, name: 'props-base', asset: assets.PROPS_BASE });
export const propsCapsule = (props: InitProps) => new Model({ ...props, name: 'props-capsule', asset: assets.PROPS_CAPSULE });
export const propsChest = (props: InitProps) => new Model({ ...props, name: 'props-chest', asset: assets.PROPS_CHEST });
export const propsComputer = (props: InitProps) => new Model({ ...props, name: 'props-computer', asset: assets.PROPS_COMPUTER });
export const propsComputerSmall = (props: InitProps) => new Model({ ...props, name: 'props-computer-small', asset: assets.PROPS_COMPUTERSMALL });
export const propsContainerFull = (props: InitProps) => new Model({ ...props, name: 'props-container-full', asset: assets.PROPS_CONTAINERFULL });
export const propsCrate = (props: InitProps) => new Model({ ...props, name: 'props-crate', asset: assets.PROPS_CRATE });
export const propsCrateLong = (props: InitProps) => new Model({ ...props, name: 'props-crate-long', asset: assets.PROPS_CRATELONG });
export const propsLaser = (props: InitProps) => new Model({ ...props, name: 'props-laser', asset: assets.PROPS_LASER });
export const propsPod = (props: InitProps) => new Model({ ...props, name: 'props-pod', asset: assets.PROPS_POD });
export const propsShelf = (props: InitProps) => new Model({ ...props, name: 'props-shelf', asset: assets.PROPS_SHELF });
export const propsShelfTall = (props: InitProps) => new Model({ ...props, name: 'props-shelf-tall', asset: assets.PROPS_SHELF_TALL });
export const propsStatue = (props: InitProps) => new Model({ ...props, name: 'props-statue', asset: assets.PROPS_STATUE });
export const propsTeleporter1 = (props: InitProps) => new Model({ ...props, name: 'props-teleporter-1', asset: assets.PROPS_TELEPORTER_1 });
export const propsTeleporter2 = (props: InitProps) => new Model({ ...props, name: 'props-teleporter-2', asset: assets.PROPS_TELEPORTER_2 });
export const propsVessel = (props: InitProps) => new Model({ ...props, name: 'props-vessel', asset: assets.PROPS_VESSEL });
export const propsVesselShort = (props: InitProps) => new Model({ ...props, name: 'props-vessel-short', asset: assets.PROPS_VESSEL_SHORT });
export const propsVesselTall = (props: InitProps) => new Model({ ...props, name: 'props-vessel-tall', asset: assets.PROPS_VESSEL_TALL });
// Roofs
export const roofCornerPipes = (props: InitProps) => new Model({ ...props, name: 'roof-corner-pipes', asset: assets.ROOFTILE_CORNER_PIPES });
export const roofDetails = (props: InitProps) => new Model({ ...props, name: 'roof-details', asset: assets.ROOFTILE_DETAILS });
export const roofEmpty = (props: InitProps) => new Model({ ...props, name: 'roof-empty', asset: assets.ROOFTILE_EMPTY });
export const roofInnerCornerPipes = (props: InitProps) => new Model({ ...props, name: 'roof-inner-corner-pipes', asset: assets.ROOFTILE_INNERCORNER_PIPES });
export const roofOrangeVent = (props: InitProps) => new Model({ ...props, name: 'roof-orange-vent', asset: assets.ROOFTILE_ORANGEVENT });
export const roofPipes1 = (props: InitProps) => new Model({ ...props, name: 'roof-pipes-1', asset: assets.ROOFTILE_PIPES1 });
export const roofPipes2 = (props: InitProps) => new Model({ ...props, name: 'roof-pipes-2', asset: assets.ROOFTILE_PIPES2 });
export const roofPlate1 = (props: InitProps) => new Model({ ...props, name: 'roof-plate-1', asset: assets.ROOFTILE_PLATE });
export const roofPlate2 = (props: InitProps) => new Model({ ...props, name: 'roof-plate-2', asset: assets.ROOFTILE_PLATE2 });
export const roofSidesPipes = (props: InitProps) => new Model({ ...props, name: 'roof-sides-pipes', asset: assets.ROOFTILE_SIDES_PIPES });
export const roofSmallVents = (props: InitProps) => new Model({ ...props, name: 'roof-small-vents', asset: assets.ROOFTILE_SMALLVENTS });
export const roofVents = (props: InitProps) => new Model({ ...props, name: 'roof-vents', asset: assets.ROOFTILE_VENTS });
// Staircase
export const staircase = (props: InitProps) => new Model({ ...props, name: 'staircase', asset: assets.STAIRCASE });
// Walls
const doorDoubleWallSideA = (props: InitProps) => new Model({ ...props, name: 'door-double-wall-side-a', asset: assets.WALLS__DOORDOUBLE_WALL_SIDEA });
const doorDoubleWallSideB = (props: InitProps) => new Model({ ...props, name: 'door-double-wall-side-b', asset: assets.WALLS__DOORDOUBLE_WALL_SIDEB });
export const doorDoubleLongWallSideA = (props: InitProps) => new Model({ ...props, name: 'door-double-long-wall-side-a', asset: assets.WALLS__DOORDOUBLELONG_WALL_SIDEA });
export const doorSingleWallSideA = (props: InitProps) => new Model({ ...props, name: 'door-single-wall-side-a', asset: assets.WALLS__DOORSINGLE_WALL_SIDEA });
export const doorSingleWallSideB = (props: InitProps) => new Model({ ...props, name: 'door-single-wall-side-b', asset: assets.WALLS__DOORSINGLE_WALL_SIDEB });
export const doorSingleLongWallSideA = (props: InitProps) => new Model({ ...props, name: 'door-single-long-wall-side-a', asset: assets.WALLS__DOORSINGLELONG_WALL_SIDEA });
export const longWindowWallSideA = (props: InitProps) => new Model({ ...props, name: 'long-window-wall-side-a', asset: assets.WALLS__LONGWINDOW_WALL_SIDEA });
export const longWindowWallSideB = (props: InitProps) => new Model({ ...props, name: 'long-window-wall-side-b', asset: assets.WALLS__LONGWINDOW_WALL_SIDEB });
export const pipes = (props: InitProps) => new Model({ ...props, name: 'pipes', asset: assets.WALLS__PIPES });
export const smallWindowsWallSideA = (props: InitProps) => new Model({ ...props, name: 'small-window-wall-side-a', asset: assets.WALLS__SMALLWINDOWS_WALL_SIDEA });
export const smallWindowsWallSideB = (props: InitProps) => new Model({ ...props, name: 'small-window-wall-side-b', asset: assets.WALLS__SMALLWINDOWS_WALL_SIDEB });
export const threeWindowsWallSideA = (props: InitProps) => new Model({ ...props, name: 'three-windows-wall-side-a', asset: assets.WALLS__THREEWINDOWS_WALL_SIDEA });
export const threeWindowsWallSideB = (props: InitProps) => new Model({ ...props, name: 'three-windows-wall-side-b', asset: assets.WALLS__THREEWINDOWS_WALL_SIDEB });
export const wall1 = (props: InitProps) => new Model({ ...props, name: 'wall-1', asset: assets.WALLS__WALL_1 });
export const wall2 = (props: InitProps) => new Model({ ...props, name: 'wall-2', asset: assets.WALLS__WALL_2 });
export const wall3 = (props: InitProps) => new Model({ ...props, name: 'wall-3', asset: assets.WALLS__WALL_3 });
export const wall4 = (props: InitProps) => new Model({ ...props, name: 'wall-4', asset: assets.WALLS__WALL_4 });
export const wall5 = (props: InitProps) => new Model({ ...props, name: 'wall-5', asset: assets.WALLS__WALL_5 });
export const wallEmpty = (props: InitProps) => new Model({ ...props, name: 'wall-empty', asset: assets.WALLS__WALL_EMPTY });
export const windowWallSideA = (props: InitProps) => new Model({ ...props, name: 'window-wall-side-a', asset: assets.WALLS__WINDOW_WALL_SIDEA });
export const windowWallSideB = (props: InitProps) => new Model({ ...props, name: 'window-wall-side-b', asset: assets.WALLS__WINDOW_WALL_SIDEB });
export type WallProps = { pole: ModelFactory; wall: ModelFactory; pipes: ModelFactory };
export class Wall extends Entity {
    readonly wall: Model;
    readonly pole: Model;
    readonly pipes: Model;

    constructor(props: InitProps & WallProps) {
        const { scene, entityManager, metadata, wall, pole, pipes } = props;
        super({ name: 'wall', scene });
        this.wall = wall({ scene, entityManager, metadata });
        this.pole = pole({ scene, entityManager, metadata });
        this.pipes = pipes({ scene, entityManager, metadata });
        this.wall.transform.parent = this.transform;
        this.pole.transform.parent = this.transform;
        this.pipes.transform.parent = this.transform;
        this.pole.transform.translate(new BABYLON.Vector3(1, 0, 0), -2);
    }
}
export const wall = (wProps: WallProps) => (iProps: InitProps) => new Wall({ ...wProps, ...iProps });
export type WindowWallProps = { pole: ModelFactory; pipes: ModelFactory };
export class WindowWall extends Entity {
    readonly sideA: Model;
    readonly pole: Model;
    readonly sideB: Model;
    readonly pipes: Model;

    constructor(props: InitProps & WindowWallProps) {
        const { scene, entityManager, metadata, pole, pipes } = props;
        super({ name: 'window-wall', scene });
        this.sideA = windowWallSideA({ scene, entityManager, metadata });
        this.sideB = windowWallSideB({ scene, entityManager, metadata });
        this.pole = pole({ scene, entityManager, metadata });
        this.pipes = pipes({ scene, entityManager, metadata });
        this.sideA.transform.parent = this.transform;
        this.sideB.transform.parent = this.transform;
        this.pole.transform.parent = this.transform;
        this.pipes.transform.parent = this.transform;
        this.sideA.transform.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
        this.sideB.transform.translate(new BABYLON.Vector3(0, 0, 1), 1);
        this.pole.transform.translate(new BABYLON.Vector3(1, 0, 0), 2);
        this.pole.transform.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
        this.pipes.transform.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
    }
}
export const windowWall = (wProps: WindowWallProps) => (iProps: InitProps) => new WindowWall({ ...wProps, ...iProps });
// Details
export const detailsArrow1 = (props: InitProps) => new Model({ ...props, name: 'details-arrow-1', asset: assets.DETAILS__DETAILS_ARROW });
export const detailsArrow2 = (props: InitProps) => new Model({ ...props, name: 'details-arrow-2', asset: assets.DETAILS__DETAILS_ARROW_2 });
export const detailsBasic1 = (props: InitProps) => new Model({ ...props, name: 'details-basic-1', asset: assets.DETAILS__DETAILS_BASIC_1 });
export const detailsBasic2 = (props: InitProps) => new Model({ ...props, name: 'details-basic-2', asset: assets.DETAILS__DETAILS_BASIC_2 });
export const detailsBasic3 = (props: InitProps) => new Model({ ...props, name: 'details-basic-3', asset: assets.DETAILS__DETAILS_BASIC_3 });
export const detailsBasic4 = (props: InitProps) => new Model({ ...props, name: 'details-basic-4', asset: assets.DETAILS__DETAILS_BASIC_4 });
export const detailsCylinder = (props: InitProps) => new Model({ ...props, name: 'details-cylinder', asset: assets.DETAILS__DETAILS_CYLINDER });
export const detailsCylinderLong = (props: InitProps) => new Model({ ...props, name: 'details-cylinder-long', asset: assets.DETAILS__DETAILS_CYLINDER_LONG });
export const detailsDots = (props: InitProps) => new Model({ ...props, name: 'details-dots', asset: assets.DETAILS__DETAILS_DOTS });
export const detailsHexagon = (props: InitProps) => new Model({ ...props, name: 'details-hexagon', asset: assets.DETAILS__DETAILS_HEXAGON });
export const detailsOutput = (props: InitProps) => new Model({ ...props, name: 'details-output', asset: assets.DETAILS__DETAILS_OUTPUT });
export const detailsOutputSmall = (props: InitProps) => new Model({ ...props, name: 'details-output-small', asset: assets.DETAILS__DETAILS_OUTPUT_SMALL });
export const detailsPipesLong = (props: InitProps) => new Model({ ...props, name: 'details-pipes-long', asset: assets.DETAILS__DETAILS_PIPES_LONG });
export const detailsPipesMedium = (props: InitProps) => new Model({ ...props, name: 'details-pipes-medium', asset: assets.DETAILS__DETAILS_PIPES_MEDIUM });
export const detailsPipesSmall = (props: InitProps) => new Model({ ...props, name: 'details-pipes-small', asset: assets.DETAILS__DETAILS_PIPES_SMALL });
export const detailsPlateDetails = (props: InitProps) => new Model({ ...props, name: 'details-plate-details', asset: assets.DETAILS__DETAILS_PLATE_DETAILS });
export const detailsPlateLarge = (props: InitProps) => new Model({ ...props, name: 'details-plate-large', asset: assets.DETAILS__DETAILS_PLATE_LARGE });
export const detailsPlateLong = (props: InitProps) => new Model({ ...props, name: 'details-plate-long', asset: assets.DETAILS__DETAILS_PLATE_LONG });
export const detailsPlateSmall = (props: InitProps) => new Model({ ...props, name: 'details-plate-small', asset: assets.DETAILS__DETAILS_PLATE_SMALL });
export const detailsTriangles = (props: InitProps) => new Model({ ...props, name: 'details-triangles', asset: assets.DETAILS__DETAILS_TRIANGLES });
export const detailsVent1 = (props: InitProps) => new Model({ ...props, name: 'details-vent-1', asset: assets.DETAILS__DETAILS_VENT_1 });
export const detailsVent2 = (props: InitProps) => new Model({ ...props, name: 'details-vent-2', asset: assets.DETAILS__DETAILS_VENT_2 });
export const detailsVent3 = (props: InitProps) => new Model({ ...props, name: 'details-vent-3', asset: assets.DETAILS__DETAILS_VENT_3 });
export const detailsVent4 = (props: InitProps) => new Model({ ...props, name: 'details-vent-4', asset: assets.DETAILS__DETAILS_VENT_4 });
export const detailsVent5 = (props: InitProps) => new Model({ ...props, name: 'details-vent-5', asset: assets.DETAILS__DETAILS_VENT_5 });
export const detailsX = (props: InitProps) => new Model({ ...props, name: 'details-x', asset: assets.DETAILS__DETAILS_X });

// Compounds
export class DoorDoubleWall extends Entity {
    readonly sideA: Model;
    readonly sideB: Model;
    readonly doors: DoorDouble;

    constructor(props: InitProps) {
        const { scene, entityManager, metadata } = props;
        super({ name: 'door-double-wall', scene });
        this.doors = doorDouble({ scene, entityManager, metadata });
        this.sideA = doorDoubleWallSideA({ scene, entityManager, metadata });
        this.sideB = doorDoubleWallSideB({ scene, entityManager, metadata });
        this.doors.transform.parent = this.transform;
        this.sideA.transform.parent = this.transform;
        this.sideB.transform.parent = this.transform;
        this.sideA.transform.position = new BABYLON.Vector3(0, 0, -1);
        this.sideA.transform.rotation = new BABYLON.Vector3(0, Math.PI, 0);
    }
}
export const doorDoubleWall = (props: InitProps): DoorDoubleWall => new DoorDoubleWall({ ...props });
// objects
export const earth = (props: InitProps) => new Model({ ...props, name: 'earth', asset: assets.EARTH });
export const robot = (props: InitProps) => new Model({ ...props, name: 'robot', asset: assets.EARTH });
