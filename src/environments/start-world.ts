import { Vector3, Scene, TransformNode } from '@babylonjs/core';
import { World } from './world.js';
import { EntityManager } from '../managers/entity-manager.js';
import * as models from '../entities/model.js';
import * as assets from '../assets';

export class StartWorld extends World {
    constructor(scene: Scene, entityManager: EntityManager) {
        super(scene, entityManager);
        this.buildFloorAndRoof();
        this.buildWalls();
        this.buildWindows();
        this.buildTubes();
    }

    private buildWalls = () => {
        const { scene, entityManager } = this;
        const parent = new TransformNode('wall');
        [
            { position: new Vector3(-19, 0, 19), rotation: new Vector3(0, Math.PI, 0) },
            // { position: new Vector3(-15, 0, 19), rotation: new Vector3(0, Math.PI, 0) },
            { position: new Vector3(-11, 0, 19), rotation: new Vector3(0, Math.PI, 0) },
            // { position: new Vector3(-7, 0, 19), rotation: new Vector3(0, Math.PI, 0) },
            { position: new Vector3(-3, 0, 19), rotation: new Vector3(0, Math.PI, 0) },
            { position: new Vector3(1, 0, 19), rotation: new Vector3(0, Math.PI, 0) },
            // { position: new Vector3(5, 0, 19), rotation: new Vector3(0, Math.PI, 0) },
            { position: new Vector3(9, 0, 19), rotation: new Vector3(0, Math.PI, 0) },
            // { position: new Vector3(13, 0, 19), rotation: new Vector3(0, Math.PI, 0) },
            { position: new Vector3(17, 0, 19), rotation: new Vector3(0, Math.PI, 0) },
        ].forEach(({ position, rotation }) => {
            const wall = models.wall1({ scene, entityManager });
            wall.transform.position = position;
            wall.transform.rotation = rotation;
            wall.transform.parent = parent;
        });
        [
            { position: new Vector3(19, 0, 17), rotation: new Vector3(0, -Math.PI / 2, 0) },
            // { position: new Vector3(19, 0, 13), rotation: new Vector3(0, -Math.PI / 2, 0) },
            { position: new Vector3(19, 0, 9), rotation: new Vector3(0, -Math.PI / 2, 0) },
            // { position: new Vector3(19, 0, 5), rotation: new Vector3(0, -Math.PI / 2, 0) },
            { position: new Vector3(19, 0, 1), rotation: new Vector3(0, -Math.PI / 2, 0) },
            { position: new Vector3(19, 0, -3), rotation: new Vector3(0, -Math.PI / 2, 0) },
            // { position: new Vector3(19, 0, -7), rotation: new Vector3(0, -Math.PI / 2, 0) },
            { position: new Vector3(19, 0, -11), rotation: new Vector3(0, -Math.PI / 2, 0) },
            // { position: new Vector3(19, 0, -15), rotation: new Vector3(0, -Math.PI / 2, 0) },
            { position: new Vector3(19, 0, -19), rotation: new Vector3(0, -Math.PI / 2, 0) },
        ].forEach(({ position, rotation }) => {
            const wall = models.wall1({ scene, entityManager });
            wall.transform.position = position;
            wall.transform.rotation = rotation;
            wall.transform.parent = parent;
        });
        [
            { position: new Vector3(17, 0, -21), rotation: Vector3.Zero() },
            // { position: new Vector3(13, 0, -21), rotation: Vector3.Zero() },
            { position: new Vector3(9, 0, -21), rotation: Vector3.Zero() },
            // { position: new Vector3(5, 0, -21), rotation: Vector3.Zero() },
            { position: new Vector3(1, 0, -21), rotation: Vector3.Zero() },
            { position: new Vector3(-3, 0, -21), rotation: Vector3.Zero() },
            // { position: new Vector3(-7, 0, -21), rotation: Vector3.Zero() },
            { position: new Vector3(-11, 0, -21), rotation: Vector3.Zero() },
            // { position: new Vector3(-15, 0, -21), rotation: Vector3.Zero() },
            { position: new Vector3(-19, 0, -21), rotation: Vector3.Zero() },
        ].forEach(({ position, rotation }) => {
            const wall = models.wall1({ scene, entityManager });
            wall.transform.position = position;
            wall.transform.rotation = rotation;
            wall.transform.parent = parent;
        });
        [
            { position: new Vector3(-21, 0, -19), rotation: new Vector3(0, Math.PI / 2, 0) },
            // { position: new Vector3(-21, 0, -15), rotation: new Vector3(0, Math.PI / 2, 0) },
            { position: new Vector3(-21, 0, -11), rotation: new Vector3(0, Math.PI / 2, 0) },
            // { position: new Vector3(-21, 0, -7), rotation: new Vector3(0, Math.PI / 2, 0) },
            { position: new Vector3(-21, 0, -3), rotation: new Vector3(0, Math.PI / 2, 0) },
            { position: new Vector3(-21, 0, 1), rotation: new Vector3(0, Math.PI / 2, 0) },
            // { position: new Vector3(-21, 0, 5), rotation: new Vector3(0, Math.PI / 2, 0) },
            { position: new Vector3(-21, 0, 9), rotation: new Vector3(0, Math.PI / 2, 0) },
            // { position: new Vector3(-21, 0, 13), rotation: new Vector3(0, Math.PI / 2, 0) },
            { position: new Vector3(-21, 0, 17), rotation: new Vector3(0, Math.PI / 2, 0) },
        ].forEach(({ position, rotation }) => {
            const wall = models.wall1({ scene, entityManager });
            wall.transform.position = position;
            wall.transform.rotation = rotation;
            wall.transform.parent = parent;
        });
    };

    private buildTubes = () => {
        const { scene, entityManager } = this;
    };

    private buildWindows = () => {
        const { scene, entityManager } = this;
        const parent = new TransformNode('window');
        [
            // { position: new Vector3(-19, 0, 19), rotation: Vector3.Zero() },
            { position: new Vector3(-15, 0, 19), rotation: Vector3.Zero() },
            // { position: new Vector3(-11, 0, 19), rotation: Vector3.Zero() },
            { position: new Vector3(-7, 0, 19), rotation: Vector3.Zero() },
            // { position: new Vector3(-3, 0, 19), rotation: Vector3.Zero() },
            // { position: new Vector3(1, 0, 19), rotation: Vector3.Zero() },
            { position: new Vector3(5, 0, 19), rotation: Vector3.Zero() },
            // { position: new Vector3(9, 0, 19), rotation: Vector3.Zero() },
            { position: new Vector3(13, 0, 19), rotation: Vector3.Zero() },
            // { position: new Vector3(17, 0, 19), rotation: Vector3.Zero() },
        ].forEach(({ position, rotation }) => {
            const wall = models.windowWall({ scene, entityManager });
            wall.transform.position = position;
            wall.transform.rotation = rotation;
            wall.transform.parent = parent;
        });
        [
            // { position: new Vector3(19, 0, 17), rotation: new Vector3(0, Math.PI / 2, 0) },
            { position: new Vector3(19, 0, 13), rotation: new Vector3(0, Math.PI / 2, 0) },
            // { position: new Vector3(19, 0, 9), rotation: new Vector3(0, Math.PI / 2, 0) },
            { position: new Vector3(19, 0, 5), rotation: new Vector3(0, Math.PI / 2, 0) },
            // { position: new Vector3(19, 0, 1), rotation: new Vector3(0, Math.PI / 2, 0) },
            // { position: new Vector3(19, 0, -3), rotation: new Vector3(0, Math.PI / 2, 0) },
            { position: new Vector3(19, 0, -7), rotation: new Vector3(0, Math.PI / 2, 0) },
            // { position: new Vector3(19, 0, -11), rotation: new Vector3(0, Math.PI / 2, 0) },
            { position: new Vector3(19, 0, -15), rotation: new Vector3(0, Math.PI / 2, 0) },
            // { position: new Vector3(19, 0, -19), rotation: new Vector3(0, Math.PI / 2, 0) },
        ].forEach(({ position, rotation }) => {
            const wall = models.windowWall({ scene, entityManager });
            wall.transform.position = position;
            wall.transform.rotation = rotation;
            wall.transform.parent = parent;
        });
        [
            // { position: new Vector3(17, 0, -21), rotation: new Vector3(0, Math.PI, 0) },
            { position: new Vector3(13, 0, -21), rotation: new Vector3(0, Math.PI, 0) },
            // { position: new Vector3(9, 0, -21), rotation: new Vector3(0, Math.PI, 0) },
            { position: new Vector3(5, 0, -21), rotation: new Vector3(0, Math.PI, 0) },
            // { position: new Vector3(1, 0, -21), rotation: new Vector3(0, Math.PI, 0) },
            // { position: new Vector3(-3, 0, -21), rotation: new Vector3(0, Math.PI, 0) },
            { position: new Vector3(-7, 0, -21), rotation: new Vector3(0, Math.PI, 0) },
            // { position: new Vector3(-11, 0, -21), rotation: new Vector3(0, Math.PI, 0) },
            { position: new Vector3(-15, 0, -21), rotation: new Vector3(0, Math.PI, 0) },
            // { position: new Vector3(-19, 0, -21), rotation: new Vector3(0, Math.PI, 0) },
        ].forEach(({ position, rotation }) => {
            const wall = models.windowWall({ scene, entityManager });
            wall.transform.position = position;
            wall.transform.rotation = rotation;
            wall.transform.parent = parent;
        });
        [
            // { position: new Vector3(-21, 0, -19), rotation: new Vector3(0, -Math.PI / 2, 0) },
            { position: new Vector3(-21, 0, -15), rotation: new Vector3(0, -Math.PI / 2, 0) },
            // { position: new Vector3(-21, 0, -11), rotation: new Vector3(0, -Math.PI / 2, 0) },
            { position: new Vector3(-21, 0, -7), rotation: new Vector3(0, -Math.PI / 2, 0) },
            // { position: new Vector3(-21, 0, -3), rotation: new Vector3(0, -Math.PI / 2, 0) },
            // { position: new Vector3(-21, 0, 1), rotation: new Vector3(0, -Math.PI / 2, 0) },
            { position: new Vector3(-21, 0, 5), rotation: new Vector3(0, -Math.PI / 2, 0) },
            // { position: new Vector3(-21, 0, 9), rotation: new Vector3(0, -Math.PI / 2, 0) },
            { position: new Vector3(-21, 0, 13), rotation: new Vector3(0, -Math.PI / 2, 0) },
            // { position: new Vector3(-21, 0, 17), rotation: new Vector3(0, -Math.PI / 2, 0) },
        ].forEach(({ position, rotation }) => {
            const wall = models.windowWall({ scene, entityManager });
            wall.transform.position = position;
            wall.transform.rotation = rotation;
            wall.transform.parent = parent;
        });
    };

    private buildFloorAndRoof = () => {
        const { scene, entityManager } = this;
        const roofParent = new TransformNode('roof', scene);
        const floorParent = new TransformNode('floor', scene);
        const width = 20;
        const height = 20;
        for (let x = 0; x < width; x++) {
            for (let z = 0; z < height; z++) {
                const floor = models.floorBasic1({ scene, entityManager });
                floor.transform.position = new Vector3(x * 2 - width, 0, z * 2 - height);
                floor.transform.parent = floorParent;
                const roof = models.roofEmpty({ scene, entityManager });
                roof.transform.position = new Vector3(x * 2 - width, 4, z * 2 - height);
                roof.transform.parent = roofParent;
            }
        }
    };
}
