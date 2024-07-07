import * as BABYLON from '@babylonjs/core';
import { EntityManager } from '../managers/entity-manager.js';
import * as models from '../entities/model.js';
import * as materials from './materials.js';
import { World } from '../shared/world.js';

export class StartWorld extends World {
    public readonly onLaunchOptions: BABYLON.Observable<boolean> = new BABYLON.Observable();

    constructor(scene: BABYLON.Scene, entityManager: EntityManager) {
        super(scene, entityManager);
        this.floors();
        this.roof();
        // this.floor2();
        this.walls();
        this.windows();
        // this.stairs();
        this.hologram();
        this.computers();
        this.entry();
    }

    private entry = async () => {
        const { scene, entityManager } = this;
        const parent = new BABYLON.TransformNode('entry');
        let rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
        let position = new BABYLON.Vector3(-17, 0, 1);
        const entryDoor = models.doorDoubleWall({ scene, entityManager });
        entryDoor.transform.parent = parent;
        entryDoor.transform.rotation = rotation;
        entryDoor.transform.position = position;
        entryDoor.doors.addOnLoad(async () => entryDoor.doors.openAsync(true));

        const leftEntry = models.wall5({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        position = new BABYLON.Vector3(-16, 0, 5);
        leftEntry.transform.parent = parent;
        leftEntry.transform.rotation = rotation;
        leftEntry.transform.position = position;

        const rightEntry = models.wall5({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        position = new BABYLON.Vector3(-16, 0, -3);
        rightEntry.transform.parent = parent;
        rightEntry.transform.rotation = rotation;
        rightEntry.transform.position = position;

        const leftWallInner = models.wall5({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-19, 0, 3);
        leftWallInner.transform.parent = parent;
        leftWallInner.transform.rotation = rotation;
        leftWallInner.transform.position = position;

        const leftCornerInner = models.column2({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-17, 0, 3);
        leftCornerInner.transform.parent = parent;
        leftCornerInner.transform.rotation = rotation;
        leftCornerInner.transform.position = position;

        const leftWallOuter = models.wall5({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, 0, 0);
        position = new BABYLON.Vector3(-19, 0, 8);
        leftWallOuter.transform.parent = parent;
        leftWallOuter.transform.rotation = rotation;
        leftWallOuter.transform.position = position;

        const leftCornerOuter1 = models.column2({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-17, 0, 8);
        leftCornerOuter1.transform.parent = parent;
        leftCornerOuter1.transform.rotation = rotation;
        leftCornerOuter1.transform.position = position;
        const leftCornerOuter2 = models.column2({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-16, 0, 7);
        leftCornerOuter2.transform.parent = parent;
        leftCornerOuter2.transform.rotation = rotation;
        leftCornerOuter2.transform.position = position;
        const leftCornerOuter3 = models.column3({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-16.5, 0, 7.5);
        leftCornerOuter3.transform.parent = parent;
        leftCornerOuter3.transform.rotation = rotation;
        leftCornerOuter3.transform.position = position;

        const rightWallInner = models.wall5({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, 0, 0);
        position = new BABYLON.Vector3(-19, 0, -1);
        rightWallInner.transform.parent = parent;
        rightWallInner.transform.rotation = rotation;
        rightWallInner.transform.position = position;

        const rightCornerInner = models.column2({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-17, 0, -1);
        rightCornerInner.transform.parent = parent;
        rightCornerInner.transform.rotation = rotation;
        rightCornerInner.transform.position = position;

        const rightWallOuter = models.wall5({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-19, 0, -6);
        rightWallOuter.transform.parent = parent;
        rightWallOuter.transform.rotation = rotation;
        rightWallOuter.transform.position = position;

        const rightCornerOuter1 = models.column2({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-17, 0, -6);
        rightCornerOuter1.transform.parent = parent;
        rightCornerOuter1.transform.rotation = rotation;
        rightCornerOuter1.transform.position = position;
        const rightCornerOuter2 = models.column2({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-16, 0, -5);
        rightCornerOuter2.transform.parent = parent;
        rightCornerOuter2.transform.rotation = rotation;
        rightCornerOuter2.transform.position = position;
        const rightCornerOuter3 = models.column3({ scene, entityManager });
        rotation = new BABYLON.Vector3(0, Math.PI, 0);
        position = new BABYLON.Vector3(-16.5, 0, -5.5);
        rightCornerOuter3.transform.parent = parent;
        rightCornerOuter3.transform.rotation = rotation;
        rightCornerOuter3.transform.position = position;
    };

    private computers = async () => {
        const { scene, entityManager } = this;
        const parent = new BABYLON.TransformNode('computers');
        const rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
        const position = new BABYLON.Vector3(-4, 0, 1);

        const computer = models.propsComputer({ scene, entityManager, metadata: { action: 'launch' } });
        computer.transform.parent = parent;
        computer.transform.rotation = rotation;
        computer.transform.position = position;
        computer.addOnLoad(() => {
            const root = computer.transform.getChildMeshes()[0];
            root.actionManager = new BABYLON.ActionManager(scene);
            const cameraMesh = this.scene.getMeshByName('camera-box');
            root.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    {
                        trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                        parameter: cameraMesh,
                    },
                    () => this.onLaunchOptions.notifyObservers(true),
                ),
            );
            root.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    {
                        trigger: BABYLON.ActionManager.OnIntersectionExitTrigger,
                        parameter: cameraMesh,
                    },
                    () => this.onLaunchOptions.notifyObservers(false),
                ),
            );
        });
    };

    private hologram = async () => {
        const { scene, entityManager } = this;
        const parent = new BABYLON.TransformNode('hologram');
        const pedestal = models.propsBase({ scene, entityManager });
        pedestal.transform.parent = parent;
        pedestal.transform.position = new BABYLON.Vector3(0, 0, 1);

        const fresnel = materials.fresnel(scene);
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

        const fighter = new models.Model({
            name: 'fighter',
            scene,
            entityManager,
            asset: { file: 'fighter.glb', directory: 'assets/fighter/' },
        });
        fighter.transform.parent = parent;
        fighter.addOnLoad(() => {
            fighter.transform.getChildMeshes().forEach((m) => {
                m.material = fresnel;
                m.checkCollisions = false;
                m.animations = [blink];
                this.scene.beginAnimation(m, 0, 60, true, 0.25);
            });
            fighter.transform.position = new BABYLON.Vector3(0, 1, 1);
            fighter.transform.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
            fighter.transform.animations = [spin];
            this.scene.beginAnimation(fighter.transform, 0, 60, true, 0.05);
        });
    };

    private floor2 = () => {
        const parent = new BABYLON.TransformNode('floor-2', this.scene);
        const rotation = BABYLON.Vector3.Zero();
        this.put({ model: models.floorBasic1, position: new BABYLON.Vector3(0, 4, 8.5), rotation, parent });
        this.put({ model: models.floorBasic1, position: new BABYLON.Vector3(0, 4, 7.5), rotation, parent });
    };

    private stairs = () => {
        const parent = new BABYLON.TransformNode('stairs', this.scene);
        const rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        this.put({ model: models.staircase, position: new BABYLON.Vector3(5, 1, 8), rotation, parent });
        this.put({ model: models.staircase, position: new BABYLON.Vector3(3.5, 2, 8), rotation, parent });
        this.put({ model: models.staircase, position: new BABYLON.Vector3(2, 3, 8), rotation, parent });
        this.put({ model: models.staircase, position: new BABYLON.Vector3(0.5, 4, 8), rotation, parent });
        this.put({ model: models.staircase, position: new BABYLON.Vector3(-1, 5, 8), rotation, parent });
    };

    private walls = () => {
        const parent = new BABYLON.TransformNode('walls', this.scene);
        let rotation = new BABYLON.Vector3(0, Math.PI, 0);
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-10, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-6, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-2, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(0, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(4, 0, 9), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.column1, pipes: models.pipes }), position: new BABYLON.Vector3(8, 0, 9), rotation, parent });

        rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, 8), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, 4), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, 0), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, -2), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, -6), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.column1, pipes: models.pipes }), position: new BABYLON.Vector3(9, 0, -10), rotation, parent });

        rotation = BABYLON.Vector3.Zero();
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(8, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(4, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(0, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-2, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-6, 0, -11), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.column1, pipes: models.pipes }), position: new BABYLON.Vector3(-10, 0, -11), rotation, parent });

        rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, -10), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, -6), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall2, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, -2), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, 0), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall3, pole: models.columnSlim, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, 4), rotation, parent });
        this.put({ model: models.wall({ wall: models.wall1, pole: models.column1, pipes: models.pipes }), position: new BABYLON.Vector3(-11, 0, 8), rotation, parent });
    };

    private windows = () => {
        const parent = new BABYLON.TransformNode('windows', this.scene);
        const model = models.windowWall({ pole: models.columnSlim, pipes: models.pipes });
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

    private floors = () => {
        const parent = new BABYLON.TransformNode('floors', this.scene);
        const rotation = BABYLON.Vector3.Zero();
        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                this.put({ model: models.floorBasic1, position: new BABYLON.Vector3(x - width / 2 - 0.5, 0, z - height / 2 - 0.5), rotation, parent });
            }
        }
    };

    private roof = () => {
        const parent = new BABYLON.TransformNode('roof', this.scene);
        const rotation = new BABYLON.Vector3(0, Math.PI, 0);
        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                this.put({ model: models.roofEmpty, position: new BABYLON.Vector3(x - width / 2 - 0.5, 4.5, z - height / 2 - 0.5), rotation, parent });
            }
        }
    };

    private put = (config: { model: models.EntityFactory; position: BABYLON.Vector3; rotation: BABYLON.Vector3; parent?: BABYLON.TransformNode }) => {
        const { scene, entityManager } = this;
        const { model, position, rotation, parent } = config;
        const tile = model({ scene, entityManager });
        const offsetX = 1;
        const scaleX = 2;
        const offsetY = 0;
        const scaleY = 1;
        const offsetZ = 1;
        const scaleZ = 2;
        tile.transform.position = new BABYLON.Vector3(position.x * scaleX + offsetX, position.y * scaleY + offsetY, position.z * scaleZ + offsetZ);
        tile.transform.rotation = rotation;
        tile.transform.parent = parent;
        return tile;
    };
}
