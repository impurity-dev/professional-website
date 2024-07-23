import * as BABYLON from '@babylonjs/core';
import { GameManager } from '../managers/game-manager';

export class MenuCamera {
    public readonly camera: BABYLON.ArcRotateCamera;

    constructor(props: { scene: BABYLON.Scene; gameManager: GameManager }) {
        const { scene, gameManager } = props;
        this.camera = new BABYLON.ArcRotateCamera('Camera', 0, 0.8, 200, BABYLON.Vector3.Zero(), scene);
        this.camera.attachControl(gameManager.canvas, true);
        scene.activeCameras = [...scene.activeCameras, this.camera];
    }
}

export class GuiCamera {
    public readonly mask = 0x10000000;
    public readonly camera: BABYLON.ArcRotateCamera;

    constructor(props: { scene: BABYLON.Scene }) {
        const { scene } = props;
        this.camera = new BABYLON.ArcRotateCamera('BGCamera', Math.PI / 2 + Math.PI / 7, Math.PI / 2, 100, new BABYLON.Vector3(0, 20, 0), scene);
        this.camera.layerMask = this.mask;
        scene.activeCameras.push(this.camera);
        scene.activeCameras = [...scene.activeCameras, this.camera];
    }
}
