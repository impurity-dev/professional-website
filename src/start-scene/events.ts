import * as BABYLON from '@babylonjs/core';

export class Events {
    public readonly onStart: BABYLON.Observable<void> = new BABYLON.Observable();
    public readonly onOptions: BABYLON.Observable<{ toggle: boolean }> = new BABYLON.Observable();
    public readonly onCredits: BABYLON.Observable<{ toggle: boolean }> = new BABYLON.Observable();
    public readonly onExplaination: BABYLON.Observable<{ toggle: boolean }> = new BABYLON.Observable();
    public readonly onClick: BABYLON.Observable<void> = new BABYLON.Observable();
    public readonly onHover: BABYLON.Observable<void> = new BABYLON.Observable();
}
