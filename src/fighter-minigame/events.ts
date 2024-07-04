import * as BABYLON from '@babylonjs/core';

export type ControlEvent = {
    yaw: number;
    pitch: number;
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;
    leftShift: boolean;
};
export class FighterEvents {
    readonly controls: BABYLON.Observable<ControlEvent> = new BABYLON.Observable();
    readonly fire: BABYLON.Observable<void> = new BABYLON.Observable();
}
