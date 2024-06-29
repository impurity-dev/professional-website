import * as BABYLON from '@babylonjs/core';

export class FighterEvents {
    private readonly movement: BABYLON.Observable<{
        pitch: number;
        yaw: number;
        thrust: number;
    }> = new BABYLON.Observable();
    private readonly fire: BABYLON.Observable<void> = new BABYLON.Observable();
    private readonly boost: BABYLON.Observable<void> = new BABYLON.Observable();
}
