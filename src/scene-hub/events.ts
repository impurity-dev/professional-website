import * as BABYLON from '@babylonjs/core';

export type OnLaunch = () => void;
export type StartGuiProps = {};
export type TriggerType = {
    type: 'launch';
    toggle: boolean;
};
export type ActionType = { type: 'launch' };
export class HubEvents {
    public readonly onTrigger: BABYLON.Observable<TriggerType> = new BABYLON.Observable();
    public readonly onAction: BABYLON.Observable<ActionType> = new BABYLON.Observable();
}
