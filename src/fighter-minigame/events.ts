import * as BABYLON from '@babylonjs/core';

export class FighterEvents {
    readonly movement: BABYLON.Observable<{
        pitch: number;
        yaw: number;
        thrust: number;
    }> = new BABYLON.Observable();
    readonly fire: BABYLON.Observable<void> = new BABYLON.Observable();
    readonly boost: BABYLON.Observable<void> = new BABYLON.Observable();
}
