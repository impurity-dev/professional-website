import { State } from '../shared/state.js';

export type GoToMenuProps = { type: 'menu' };
export type GoToHubProps = { type: 'hub' };
export type GoToLaunchProps = { type: 'launch' };
export type GoToTravelProps = { type: 'travel' };
export type GoToOrbitProps = { type: 'orbit' };
export type GoToMapProps = { type: 'map' };
export type GoToPracticeProps = { type: 'practice' };
export type GoToFighterProps = { type: 'fighter' };
export type GoToProps = GoToMenuProps | GoToHubProps | GoToLaunchProps | GoToTravelProps | GoToOrbitProps | GoToMapProps | GoToPracticeProps | GoToFighterProps;

export abstract class StateMachine {
    private _state: State;

    getState = (): State => this._state;

    protected setState = async (state: State): Promise<void> => {
        const oldState = this._state;
        this._state = state;
        await this._state.start();
        if (oldState) oldState.dispose();
    };

    abstract goTo(props: GoToProps): Promise<void>;
}
