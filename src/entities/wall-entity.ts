import * as assets from '../assets';
import { EntityManager } from '../managers/entity-manager';
import { Scene, TransformNode, Vector3, SpotLight, ShadowGenerator } from '@babylonjs/core';
import { AssetEntity } from './asset-entity';

class DoorDoubleWallSideA extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.WALLS__DOORDOUBLE_WALL_SIDEA);
    }
}

class DoorDoubleWallSideB extends AssetEntity {
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        super(name, scene, entityManager, assets.WALLS__DOORDOUBLE_WALL_SIDEB);
    }
}

export class DoorDoubleWallSide {
    readonly transform: TransformNode;
    readonly sideA: DoorDoubleWallSideA;
    readonly lightA: SpotLight;
    readonly shadowA: ShadowGenerator;
    readonly sideB: DoorDoubleWallSideB;
    readonly lightB: SpotLight;
    readonly shadowB: ShadowGenerator;
    constructor(name: string, scene: Scene, entityManager: EntityManager) {
        this.transform = new TransformNode(name, scene);
        this.sideA = new DoorDoubleWallSideA(`${name}-side-a`, scene, entityManager);
        this.sideB = new DoorDoubleWallSideB(`${name}-side-b`, scene, entityManager);
        this.sideA.transform.parent = this.transform;
        this.sideB.transform.parent = this.transform;
        this.sideA.transform.position = new Vector3(0, 0, -1);
        this.sideA.transform.rotation = new Vector3(0, Math.PI, 0);
        this.lightA = new SpotLight(
            `${name}-light-a`,
            this.sideA.transform.position.add(new Vector3(0, 3.5, 0)),
            new Vector3(0, -30, -10),
            Math.PI,
            20,
            scene,
        );
        this.lightA.parent = this.transform;
        this.shadowA = new ShadowGenerator(1024, this.lightA);
        this.lightB = new SpotLight(
            `${name}-light-b`,
            this.sideB.transform.position.add(new Vector3(0, 3.5, 0)),
            new Vector3(0, -30, 10),
            Math.PI,
            20,
            scene,
        );
        this.lightB.parent = this.transform;
        this.shadowB = new ShadowGenerator(1024, this.lightB);
    }
}
