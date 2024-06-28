import * as BABYLON from '@babylonjs/core';

export class FighterEvents {
    private readonly fire: BABYLON.Observable<void> = new BABYLON.Observable();
    private readonly hit: BABYLON.Observable<void> = new BABYLON.Observable();
    private readonly boost: BABYLON.Observable<void> = new BABYLON.Observable();
}
