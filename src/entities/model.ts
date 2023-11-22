import { Animation, Scene, ShadowGenerator, SpotLight, TransformNode, Vector3, ContainerAssetTask } from '@babylonjs/core';
import { Asset, EntityManager } from '../managers/entity-manager';
import * as assets from '../assets';
import { Entity } from './entity';

type ModelProps = { name: string; scene: Scene; entityManager: EntityManager; asset: Asset };
export class Model extends Entity {
    constructor(props: ModelProps) {
        super({ name: props.name, scene: props.scene });
        this.transform.metadata = props.asset;
        props.entityManager.queue(props.asset).add((task) => this.load(task));
    }

    protected load = (task: ContainerAssetTask) => {
        const entries = task.loadedContainer.instantiateModelsToScene((n) => n, false, { doNotInstantiate: true });
        entries.rootNodes.forEach((node) => (node.parent = this.transform));
        this.transform.getChildMeshes().forEach((m) => {
            if (!m.isAnInstance) m.receiveShadows = true;
            m.checkCollisions = true;
        });
    };
}

export type InitProps = { scene: Scene; entityManager: EntityManager };
// Columns
export const column1 = (props: InitProps) => new Model({ ...props, name: 'column-1', asset: assets.COLUMN_1 });
export const column2 = (props: InitProps) => new Model({ ...props, name: 'column-2', asset: assets.COLUMN_2 });
export const column3 = (props: InitProps) => new Model({ ...props, name: 'column-3', asset: assets.COLUMN_3 });
export const columnSlim = (props: InitProps) => new Model({ ...props, name: 'column-slim', asset: assets.COLUMN_SLIM });
// Doors
export class DoorDouble extends Model {
    private left: TransformNode;
    private right: TransformNode;
    private openLeft: Animation;
    private openRight: Animation;

    constructor(props: InitProps) {
        super({ ...props, name: 'door-double', asset: assets.DOOR_DOUBLE });
        this.openLeft = new Animation('openLeftDoorDoubleAnimation', 'position.x', 60, Animation.ANIMATIONTYPE_FLOAT);
        const keys = [
            {
                frame: 0,
                value: 0,
            },
            {
                frame: 5,
                value: 0.01,
            },
            {
                frame: 10,
                value: 0.02,
            },
            {
                frame: 20,
                value: 0.1,
            },
            {
                frame: 100,
                value: 1.5,
            },
        ];
        this.openLeft.setKeys(keys.map(({ frame, value }) => ({ frame, value: -value })));
        this.openRight = new Animation('openRightDoorDoubleAnimation', 'position.x', 60, Animation.ANIMATIONTYPE_FLOAT);
        this.openRight.setKeys(keys);
    }

    get leftDoor() {
        return this.left;
    }

    get rightDoor() {
        return this.right;
    }

    openAsync = async (isOpen: boolean) => {
        if (isOpen) {
            return Promise.all([
                this.scene.beginAnimation(this.left, 0, 100, false).waitAsync(),
                this.scene.beginAnimation(this.right, 0, 100, false).waitAsync(),
            ]);
        } else {
            return Promise.all([
                this.scene.beginAnimation(this.left, 100, 0, false).waitAsync(),
                this.scene.beginAnimation(this.right, 100, 0, false).waitAsync(),
            ]);
        }
    };

    protected load = (task: ContainerAssetTask) => {
        const entries = task.loadedContainer.instantiateModelsToScene((n) => n, false, { doNotInstantiate: false });
        entries.rootNodes.forEach((node) => (node.parent = this.transform));
        this.transform.getChildMeshes().forEach((m) => {
            if (!m.isAnInstance) m.receiveShadows = true;
            m.checkCollisions = true;
        });
        this.transform.getChildTransformNodes().forEach((t) => {
            if (t.name === 'Door_Double.L') this.left = t as TransformNode;
            if (t.name === 'Door_Double.R') this.right = t as TransformNode;
        });
        this.left.animations.push(this.openLeft);
        this.right.animations.push(this.openRight);
    };
}
export const doorDouble = (props: InitProps) => new DoorDouble({ ...props });
export const doorSingle = (props: InitProps) => new Model({ ...props, name: 'door-single', asset: assets.DOOR_SINGLE });
// Floors
export const floorBasic1 = (props: InitProps) => new Model({ ...props, name: 'floor-basic-1', asset: assets.FLOORTILE_BASIC });
export const floorBasic2 = (props: InitProps) => new Model({ ...props, name: 'floor-basic-2', asset: assets.FLOORTILE_BASIC2 });
export const floorCorner = (props: InitProps) => new Model({ ...props, name: 'floor-corner', asset: assets.FLOORTILE_CORNER });
export const floorDoubleHallway = (props: InitProps) =>
    new Model({ ...props, name: 'floor-double-hallway', asset: assets.FLOORTILE_DOUBLE_HALLWAY });
export const floorEmpty = (props: InitProps) => new Model({ ...props, name: 'floor-empty', asset: assets.FLOORTILE_EMPTY });
export const floorInnerCorner = (props: InitProps) =>
    new Model({ ...props, name: 'floor-inner-corner', asset: assets.FLOORTILE_INNERCORNER });
export const floorSide = (props: InitProps) => new Model({ ...props, name: 'floor-side', asset: assets.FLOORTILE_SIDE });
// Props
export const propsBase = (props: InitProps) => new Model({ ...props, name: 'props-base', asset: assets.PROPS_BASE });
export const propsCapsule = (props: InitProps) => new Model({ ...props, name: 'props-capsule', asset: assets.PROPS_CAPSULE });
export const propsChest = (props: InitProps) => new Model({ ...props, name: 'props-chest', asset: assets.PROPS_CHEST });
export const propsComputer = (props: InitProps) => new Model({ ...props, name: 'props-computer', asset: assets.PROPS_COMPUTER });
export const propsComputerSmall = (props: InitProps) =>
    new Model({ ...props, name: 'props-computer-small', asset: assets.PROPS_COMPUTERSMALL });
export const propsContainerFull = (props: InitProps) =>
    new Model({ ...props, name: 'props-container-full', asset: assets.PROPS_CONTAINERFULL });
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
export const roofCornerPipes = (props: InitProps) =>
    new Model({ ...props, name: 'roof-corner-pipes', asset: assets.ROOFTILE_CORNER_PIPES });
export const roofDetails = (props: InitProps) => new Model({ ...props, name: 'roof-details', asset: assets.ROOFTILE_DETAILS });
export const roofEmpty = (props: InitProps) => new Model({ ...props, name: 'roof-empty', asset: assets.ROOFTILE_EMPTY });
export const roofInnerCornerPipes = (props: InitProps) =>
    new Model({ ...props, name: 'roof-inner-corner-pipes', asset: assets.ROOFTILE_INNERCORNER_PIPES });
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
const doorDoubleWallSideA = (props: InitProps) =>
    new Model({ ...props, name: 'door-double-wall-side-a', asset: assets.WALLS__DOORDOUBLE_WALL_SIDEA });
const doorDoubleWallSideB = (props: InitProps) =>
    new Model({ ...props, name: 'door-double-wall-side-b', asset: assets.WALLS__DOORDOUBLE_WALL_SIDEB });
export const doorDoubleLongWallSideA = (props: InitProps) =>
    new Model({ ...props, name: 'door-double-long-wall-side-a', asset: assets.WALLS__DOORDOUBLELONG_WALL_SIDEA });
export const doorSingleWallSideA = (props: InitProps) =>
    new Model({ ...props, name: 'door-single-wall-side-a', asset: assets.WALLS__DOORSINGLE_WALL_SIDEA });
export const doorSingleWallSideB = (props: InitProps) =>
    new Model({ ...props, name: 'door-single-wall-side-b', asset: assets.WALLS__DOORSINGLE_WALL_SIDEB });
export const doorSingleLongWallSideA = (props: InitProps) =>
    new Model({ ...props, name: 'door-single-long-wall-side-a', asset: assets.WALLS__DOORSINGLELONG_WALL_SIDEA });
export const longWindowWallSideA = (props: InitProps) =>
    new Model({ ...props, name: 'long-window-wall-side-a', asset: assets.WALLS__LONGWINDOW_WALL_SIDEA });
export const longWindowWallSideB = (props: InitProps) =>
    new Model({ ...props, name: 'long-window-wall-side-b', asset: assets.WALLS__LONGWINDOW_WALL_SIDEB });
export const pipes = (props: InitProps) => new Model({ ...props, name: 'pipes', asset: assets.WALLS__PIPES });
export const smallWindowsWallSideA = (props: InitProps) =>
    new Model({ ...props, name: 'small-window-wall-side-a', asset: assets.WALLS__SMALLWINDOWS_WALL_SIDEA });
export const smallWindowsWallSideB = (props: InitProps) =>
    new Model({ ...props, name: 'small-window-wall-side-b', asset: assets.WALLS__SMALLWINDOWS_WALL_SIDEB });
export const threeWindowsWallSideA = (props: InitProps) =>
    new Model({ ...props, name: 'three-windows-wall-side-a', asset: assets.WALLS__THREEWINDOWS_WALL_SIDEA });
export const threeWindowsWallSideB = (props: InitProps) =>
    new Model({ ...props, name: 'three-windows-wall-side-b', asset: assets.WALLS__THREEWINDOWS_WALL_SIDEB });
export const wall1 = (props: InitProps) => new Model({ ...props, name: 'wall-1', asset: assets.WALLS__WALL_1 });
export const wall2 = (props: InitProps) => new Model({ ...props, name: 'wall-2', asset: assets.WALLS__WALL_2 });
export const wall3 = (props: InitProps) => new Model({ ...props, name: 'wall-3', asset: assets.WALLS__WALL_3 });
export const wall4 = (props: InitProps) => new Model({ ...props, name: 'wall-4', asset: assets.WALLS__WALL_4 });
export const wall5 = (props: InitProps) => new Model({ ...props, name: 'wall-5', asset: assets.WALLS__WALL_5 });
export const wallEmpty = (props: InitProps) => new Model({ ...props, name: 'wall-empty', asset: assets.WALLS__WALL_EMPTY });
export const windowWallSideA = (props: InitProps) =>
    new Model({ ...props, name: 'window-wall-side-a', asset: assets.WALLS__WINDOW_WALL_SIDEA });
export const windowWallSideB = (props: InitProps) =>
    new Model({ ...props, name: 'window-wall-side-b', asset: assets.WALLS__WINDOW_WALL_SIDEB });
export class WindowWall extends Entity {
    readonly sideA: Model;
    readonly lightA: SpotLight;
    readonly shadowA: ShadowGenerator;
    readonly sideB: Model;
    readonly lightB: SpotLight;
    readonly shadowB: ShadowGenerator;

    constructor(props: InitProps) {
        const { scene, entityManager } = props;
        super({ name: 'window-wall', scene });
        this.sideA = windowWallSideA({ scene, entityManager });
        this.sideB = windowWallSideB({ scene, entityManager });
        this.sideA.transform.parent = this.transform;
        this.sideB.transform.parent = this.transform;
        this.sideA.transform.rotate(new Vector3(0, 1, 0), Math.PI);
        this.sideB.transform.translate(new Vector3(0, 0, 1), 1);
        // this.lightA = new SpotLight(
        //     `${this.name}-light-a`,
        //     this.sideA.transform.position.add(new Vector3(0, 3.6, 0)),
        //     new Vector3(0, -30, -10),
        //     Math.PI,
        //     1,
        //     scene,
        // );
        // this.lightA.intensity = 10;
        // this.lightA.parent = this.sideA.transform;
        // this.shadowA = new ShadowGenerator(1024, this.lightA);
        // this.lightB = new SpotLight(
        //     `${this.name}-light-b`,
        //     this.sideB.transform.position.add(new Vector3(0, 3.6, 0)),
        //     new Vector3(0, -30, 10),
        //     Math.PI,
        //     1,
        //     scene,
        // );
        // this.lightB.intensity = 10;
        // this.lightB.parent = this.sideB.transform;
        // this.shadowB = new ShadowGenerator(1024, this.lightB);

        // this.lightA.range = 0.1;
        // this.lightB.range = 0.1;
        // this.lightA.includedOnlyMeshes.push(...this.sideA.transform.getChildMeshes());
        // this.lightB.includedOnlyMeshes.push(...this.sideB.transform.getChildMeshes());
    }
}
export const windowWall = (props: InitProps) => new WindowWall({ ...props });
// Details
export const detailsArrow1 = (props: InitProps) => new Model({ ...props, name: 'details-arrow-1', asset: assets.DETAILS__DETAILS_ARROW });
export const detailsArrow2 = (props: InitProps) => new Model({ ...props, name: 'details-arrow-2', asset: assets.DETAILS__DETAILS_ARROW_2 });
export const detailsBasic1 = (props: InitProps) => new Model({ ...props, name: 'details-basic-1', asset: assets.DETAILS__DETAILS_BASIC_1 });
export const detailsBasic2 = (props: InitProps) => new Model({ ...props, name: 'details-basic-2', asset: assets.DETAILS__DETAILS_BASIC_2 });
export const detailsBasic3 = (props: InitProps) => new Model({ ...props, name: 'details-basic-3', asset: assets.DETAILS__DETAILS_BASIC_3 });
export const detailsBasic4 = (props: InitProps) => new Model({ ...props, name: 'details-basic-4', asset: assets.DETAILS__DETAILS_BASIC_4 });
export const detailsCylinder = (props: InitProps) =>
    new Model({ ...props, name: 'details-cylinder', asset: assets.DETAILS__DETAILS_CYLINDER });
export const detailsCylinderLong = (props: InitProps) =>
    new Model({ ...props, name: 'details-cylinder-long', asset: assets.DETAILS__DETAILS_CYLINDER_LONG });
export const detailsDots = (props: InitProps) => new Model({ ...props, name: 'details-dots', asset: assets.DETAILS__DETAILS_DOTS });
export const detailsHexagon = (props: InitProps) =>
    new Model({ ...props, name: 'details-hexagon', asset: assets.DETAILS__DETAILS_HEXAGON });
export const detailsOutput = (props: InitProps) => new Model({ ...props, name: 'details-output', asset: assets.DETAILS__DETAILS_OUTPUT });
export const detailsOutputSmall = (props: InitProps) =>
    new Model({ ...props, name: 'details-output-small', asset: assets.DETAILS__DETAILS_OUTPUT_SMALL });
export const detailsPipesLong = (props: InitProps) =>
    new Model({ ...props, name: 'details-pipes-long', asset: assets.DETAILS__DETAILS_PIPES_LONG });
export const detailsPipesMedium = (props: InitProps) =>
    new Model({ ...props, name: 'details-pipes-medium', asset: assets.DETAILS__DETAILS_PIPES_MEDIUM });
export const detailsPipesSmall = (props: InitProps) =>
    new Model({ ...props, name: 'details-pipes-small', asset: assets.DETAILS__DETAILS_PIPES_SMALL });
export const detailsPlateDetails = (props: InitProps) =>
    new Model({ ...props, name: 'details-plate-details', asset: assets.DETAILS__DETAILS_PLATE_DETAILS });
export const detailsPlateLarge = (props: InitProps) =>
    new Model({ ...props, name: 'details-plate-large', asset: assets.DETAILS__DETAILS_PLATE_LARGE });
export const detailsPlateLong = (props: InitProps) =>
    new Model({ ...props, name: 'details-plate-long', asset: assets.DETAILS__DETAILS_PLATE_LONG });
export const detailsPlateSmall = (props: InitProps) =>
    new Model({ ...props, name: 'details-plate-small', asset: assets.DETAILS__DETAILS_PLATE_SMALL });
export const detailsTriangles = (props: InitProps) =>
    new Model({ ...props, name: 'details-triangles', asset: assets.DETAILS__DETAILS_TRIANGLES });
export const detailsVent1 = (props: InitProps) => new Model({ ...props, name: 'details-vent-1', asset: assets.DETAILS__DETAILS_VENT_1 });
export const detailsVent2 = (props: InitProps) => new Model({ ...props, name: 'details-vent-2', asset: assets.DETAILS__DETAILS_VENT_2 });
export const detailsVent3 = (props: InitProps) => new Model({ ...props, name: 'details-vent-3', asset: assets.DETAILS__DETAILS_VENT_3 });
export const detailsVent4 = (props: InitProps) => new Model({ ...props, name: 'details-vent-4', asset: assets.DETAILS__DETAILS_VENT_4 });
export const detailsVent5 = (props: InitProps) => new Model({ ...props, name: 'details-vent-5', asset: assets.DETAILS__DETAILS_VENT_5 });
export const detailsX = (props: InitProps) => new Model({ ...props, name: 'details-x', asset: assets.DETAILS__DETAILS_X });

// Compounds
export class DoorDoubleWall extends Entity {
    readonly sideA: Model;
    readonly lightA: SpotLight;
    readonly shadowA: ShadowGenerator;
    readonly sideB: Model;
    readonly lightB: SpotLight;
    readonly shadowB: ShadowGenerator;
    readonly doors: DoorDouble;

    constructor(props: InitProps) {
        super({ name: 'door-double-wall', scene: props.scene });
        this.doors = doorDouble({ scene: props.scene, entityManager: props.entityManager });
        this.sideA = doorDoubleWallSideA({ scene: props.scene, entityManager: props.entityManager });
        this.sideB = doorDoubleWallSideB({ scene: props.scene, entityManager: props.entityManager });
        this.doors.transform.parent = this.transform;
        this.sideA.transform.parent = this.transform;
        this.sideB.transform.parent = this.transform;
        this.sideA.transform.position = new Vector3(0, 0, -1);
        this.sideA.transform.rotation = new Vector3(0, Math.PI, 0);
        this.lightA = new SpotLight(
            `${this.name}-light-a`,
            this.sideA.transform.position.add(new Vector3(0, 3.6, 0)),
            new Vector3(0, -30, -10),
            Math.PI,
            300,
            props.scene,
        );
        this.lightA.range = 2;
        this.lightA.parent = this.transform;
        this.shadowA = new ShadowGenerator(1024, this.lightA);
        this.lightB = new SpotLight(
            `${this.name}-light-b`,
            this.sideB.transform.position.add(new Vector3(0, 3.5, 0)),
            new Vector3(0, -30, 10),
            Math.PI,
            300,
            props.scene,
        );
        this.lightB.range = 2;
        this.lightB.parent = this.transform;
        this.shadowB = new ShadowGenerator(1024, this.lightB);
    }
}
export const doorDoubleWall = (props: InitProps): DoorDoubleWall => new DoorDoubleWall({ ...props });
