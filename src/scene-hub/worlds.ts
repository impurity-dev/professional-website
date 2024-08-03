import * as BABYLON from '@babylonjs/core';
import * as assets from './assets';
import * as events from './events.js';
import * as materials from './materials.js';
import * as localModels from './models.js';
import { AssetFactory } from '../nodes/nodes.js';

export class StartWorld {
    constructor(props: { assetFactory: AssetFactory; event: events.HubEvents }) {
        const { assetFactory, event } = props;
        this.lighting({ assetFactory });
        this.portals({ assetFactory });
        this.floors({ assetFactory });
        this.roof({ assetFactory });
        // this.floor2();
        this.walls({ assetFactory });
        // this.windows({ assetFactory }); TODO
        // this.stairs();
        // this.hologram({ assetFactory }); TODO
        // this.computers({ assetFactory, event });
        this.entry({ assetFactory });
    }

    private portals = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const parent = new BABYLON.TransformNode('porals', assetFactory.scene);
        const github = new BABYLON.Texture('./textures/github.png', assetFactory.scene);
        const portal = localModels.portal({ scene: assetFactory.scene, texture: github });
        portal.scaling = new BABYLON.Vector3(4, 4, 4);
        portal.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
        portal.position = new BABYLON.Vector3(18, 2, 0);
        portal.parent = parent;
    };

    private lighting = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 1), assetFactory.scene);
        light.intensity = 0.3;
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
    };

    private entry = async (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const parent = new BABYLON.TransformNode('entry');
        let rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
        let position = new BABYLON.Vector3(-17, 0, 1);
        const entryDoor = assets.doorDoubleWall({ assetFactory });
        entryDoor.parent = parent;
        entryDoor.rotation = rotation;
        entryDoor.position = position;
        entryDoor.doors.openAsync(true);

        const leftEntry = assets.wall5({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        position = new BABYLON.Vector3(-16, 0, 5);
        leftEntry.parent = parent;
        leftEntry.rotation = rotation;
        leftEntry.position = position;

        const rightEntry = assets.wall5({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        position = new BABYLON.Vector3(-16, 0, -3);
        rightEntry.parent = parent;
        rightEntry.rotation = rotation;
        rightEntry.position = position;

        const leftWallInner = assets.wall5({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-19, 0, 3);
        leftWallInner.parent = parent;
        leftWallInner.rotation = rotation;
        leftWallInner.position = position;

        const leftCornerInner = assets.column2({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-17, 0, 3);
        leftCornerInner.parent = parent;
        leftCornerInner.rotation = rotation;
        leftCornerInner.position = position;

        const leftWallOuter = assets.wall5({ assetFactory });
        rotation = new BABYLON.Vector3(0, 0, 0);
        position = new BABYLON.Vector3(-19, 0, 8);
        leftWallOuter.parent = parent;
        leftWallOuter.rotation = rotation;
        leftWallOuter.position = position;

        const leftCornerOuter1 = assets.column2({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-17, 0, 8);
        leftCornerOuter1.parent = parent;
        leftCornerOuter1.rotation = rotation;
        leftCornerOuter1.position = position;
        const leftCornerOuter2 = assets.column2({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-16, 0, 7);
        leftCornerOuter2.parent = parent;
        leftCornerOuter2.rotation = rotation;
        leftCornerOuter2.position = position;
        const leftCornerOuter3 = assets.column3({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-16.5, 0, 7.5);
        leftCornerOuter3.parent = parent;
        leftCornerOuter3.rotation = rotation;
        leftCornerOuter3.position = position;

        const rightWallInner = assets.wall5({ assetFactory });
        rotation = new BABYLON.Vector3(0, 0, 0);
        position = new BABYLON.Vector3(-19, 0, -1);
        rightWallInner.parent = parent;
        rightWallInner.rotation = rotation;
        rightWallInner.position = position;

        const rightCornerInner = assets.column2({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-17, 0, -1);
        rightCornerInner.parent = parent;
        rightCornerInner.rotation = rotation;
        rightCornerInner.position = position;

        const rightWallOuter = assets.wall5({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-19, 0, -6);
        rightWallOuter.parent = parent;
        rightWallOuter.rotation = rotation;
        rightWallOuter.position = position;

        const rightCornerOuter1 = assets.column2({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-17, 0, -6);
        rightCornerOuter1.parent = parent;
        rightCornerOuter1.rotation = rotation;
        rightCornerOuter1.position = position;
        const rightCornerOuter2 = assets.column2({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-16, 0, -5);
        rightCornerOuter2.parent = parent;
        rightCornerOuter2.rotation = rotation;
        rightCornerOuter2.position = position;
        const rightCornerOuter3 = assets.column3({ assetFactory });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-16.5, 0, -5.5);
        rightCornerOuter3.parent = parent;
        rightCornerOuter3.rotation = rotation;
        rightCornerOuter3.position = position;
    };

    private computers = async (props: { assetFactory: AssetFactory; event: events.HubEvents }) => {
        const { assetFactory, event } = props;
        const parent = new BABYLON.TransformNode('computers');
        const rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
        const position = new BABYLON.Vector3(-4, 0, 1);

        const computer = assets.propsComputer({ scene, entityManager, metadata: { action: 'launch' } });
        computer.transform.parent = parent;
        computer.transform.rotation = rotation;
        computer.transform.position = position;
        computer.onLoad.subscribe(() => {
            const root = computer.transform.getChildMeshes()[0];
            root.actionManager = new BABYLON.ActionManager(scene);
            const cameraMesh = this.scene.getMeshByName('camera-box');
            root.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    {
                        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                        parameter: cameraMesh,
                    },
                    () =>
                        event.onTrigger.notifyObservers({
                            type: 'launch',
                            toggle: true,
                        }),
                ),
            );
            root.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    {
                        trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
                        parameter: cameraMesh,
                    },
                    () =>
                        event.onTrigger.notifyObservers({
                            type: 'launch',
                            toggle: false,
                        }),
                ),
            );
        });
    };

    private hologram = async (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const parent = new BABYLON.TransformNode('hologram');
        const pedestal = assets.propsBase({ assetFactory });
        pedestal.parent = parent;
        pedestal.position = new BABYLON.Vector3(0, 0, 1);

        const fresnel = materials.fresnel(assetFactory.scene);
        const blink = new BABYLON.Animation('blink', 'visibility', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        blink.setKeys([
            { frame: 0, value: 0 },
            { frame: 30, value: 1 },
            { frame: 60, value: 0 },
        ]);
        blink.setEasingFunction(new BABYLON.SineEase());
        const spin = new BABYLON.Animation('spin', 'rotation.y', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        spin.setKeys([
            { frame: 0, value: 0 },
            { frame: 30, value: Math.PI },
            { frame: 60, value: 2 * Math.PI },
        ]);

        const fighter = assets.fighter({ assetFactory });
        fighter.parent = parent;
        fighter.getChildMeshes().forEach((m) => {
            m.material = fresnel;
            m.checkCollisions = false;
            m.animations = [blink];
            assetFactory.scene.beginAnimation(m, 0, 60, true, 0.25);
        });
        fighter.position = new BABYLON.Vector3(0, 1, 1);
        fighter.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        fighter.animations = [spin];
        assetFactory.scene.beginAnimation(fighter, 0, 60, true, 0.05);
    };

    private floor2 = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const parent = new BABYLON.TransformNode('floor-2', assetFactory.scene);
        const rotation = BABYLON.Vector3.Zero();
        this.put({ model: assets.floorBasic1, position: new BABYLON.Vector3(0, 4, 8.5), rotation, parent });
        this.put({ model: assets.floorBasic1, position: new BABYLON.Vector3(0, 4, 7.5), rotation, parent });
    };

    private stairs = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const parent = new BABYLON.TransformNode('stairs', assetFactory.scene);
        const rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        this.put({ model: assets.staircase, position: new BABYLON.Vector3(5, 1, 8), rotation, parent });
        this.put({ model: assets.staircase, position: new BABYLON.Vector3(3.5, 2, 8), rotation, parent });
        this.put({ model: assets.staircase, position: new BABYLON.Vector3(2, 3, 8), rotation, parent });
        this.put({ model: assets.staircase, position: new BABYLON.Vector3(0.5, 4, 8), rotation, parent });
        this.put({ model: assets.staircase, position: new BABYLON.Vector3(-1, 5, 8), rotation, parent });
    };

    private walls = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const parent = new BABYLON.TransformNode('walls', assetFactory.scene);
        let rotation = new BABYLON.Vector3(0, Math.PI, 0);
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-10, 0, 9),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-6, 0, 9),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall2, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-2, 0, 9),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(0, 0, 9),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall3, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(4, 0, 9),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall3, pole: assets.column1, pipes: assets.pipes }),
            position: new BABYLON.Vector3(8, 0, 9),
            rotation,
            parent,
        });

        rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(9, 0, 8),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(9, 0, 4),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall2, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(9, 0, 0),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(9, 0, -2),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall3, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(9, 0, -6),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.column1, pipes: assets.pipes }),
            position: new BABYLON.Vector3(9, 0, -10),
            rotation,
            parent,
        });

        rotation = BABYLON.Vector3.Zero();
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(8, 0, -11),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(4, 0, -11),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall2, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(0, 0, -11),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-2, 0, -11),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall3, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-6, 0, -11),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.column1, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-10, 0, -11),
            rotation,
            parent,
        });

        rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-11, 0, -10),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-11, 0, -6),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall2, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-11, 0, -2),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-11, 0, 0),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall3, pole: assets.columnSlim, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-11, 0, 4),
            rotation,
            parent,
        });
        this.put({
            assetFactory,
            model: (props: { assetFactory: AssetFactory }) =>
                assets.wall({ assetFactory: props.assetFactory, wall: assets.wall1, pole: assets.column1, pipes: assets.pipes }),
            position: new BABYLON.Vector3(-11, 0, 8),
            rotation,
            parent,
        });
    };

    private windows = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const parent = new BABYLON.TransformNode('windows', assetFactory.scene);
        const model = assets.windowWall({ pole: assets.columnSlim, pipes: assets.pipes });
        let rotation = BABYLON.Vector3.Zero();
        this.put({ model, position: new BABYLON.Vector3(-8, 0, 9), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-4, 0, 9), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(2, 0, 9), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(6, 0, 9), rotation, parent });

        rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        this.put({ model, position: new BABYLON.Vector3(9, 0, 6), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(9, 0, 2), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(9, 0, -4), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(9, 0, -8), rotation, parent });

        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        this.put({ model, position: new BABYLON.Vector3(6, 0, -11), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(2, 0, -11), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-4, 0, -11), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-8, 0, -11), rotation, parent });

        rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
        this.put({ model, position: new BABYLON.Vector3(-11, 0, -8), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-11, 0, -4), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-11, 0, 2), rotation, parent });
        this.put({ model, position: new BABYLON.Vector3(-11, 0, 6), rotation, parent });
    };

    private floors = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const parent = new BABYLON.TransformNode('floors', assetFactory.scene);
        const rotation = BABYLON.Vector3.Zero();
        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                this.put({
                    assetFactory,
                    model: assets.floorBasic1,
                    position: new BABYLON.Vector3(x - width / 2 - 0.5, 0, z - height / 2 - 0.5),
                    rotation,
                    parent,
                });
            }
        }
    };

    private roof = (props: { assetFactory: AssetFactory }) => {
        const { assetFactory } = props;
        const parent = new BABYLON.TransformNode('roof', assetFactory.scene);
        const rotation = new BABYLON.Vector3(0, Math.PI, 0);
        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                this.put({
                    assetFactory,
                    model: assets.roofEmpty,
                    position: new BABYLON.Vector3(x - width / 2 - 0.5, 4.5, z - height / 2 - 0.5),
                    rotation,
                    parent,
                });
            }
        }
    };

    private put = (config: {
        assetFactory: AssetFactory;
        model: (props: { assetFactory: AssetFactory }) => BABYLON.TransformNode;
        position: BABYLON.Vector3;
        rotation: BABYLON.Vector3;
        parent?: BABYLON.TransformNode;
    }) => {
        const { assetFactory, model, position, rotation, parent } = config;
        const tile = model({ assetFactory });
        // tile.collidable = true;
        const offsetX = 1;
        const scaleX = 2;
        const offsetY = 0;
        const scaleY = 1;
        const offsetZ = 1;
        const scaleZ = 2;
        tile.position = new BABYLON.Vector3(position.x * scaleX + offsetX, position.y * scaleY + offsetY, position.z * scaleZ + offsetZ);
        tile.rotation = rotation;
        tile.parent = parent;
        return tile;
    };
}
