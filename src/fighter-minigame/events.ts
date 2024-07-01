import * as BABYLON from '@babylonjs/core';

export class FighterEvents {
    readonly controls: BABYLON.Observable<{
        pitch: number;
        yaw: number;
        movement: number;
        boost: number;
    }> = new BABYLON.Observable();
    readonly fire: BABYLON.Observable<void> = new BABYLON.Observable();
}
