import { State } from '../states/state.js';

export type GoToMenuProps = { type: 'menu' };
export type GoToStartProps = { type: 'start' };
export type GoToLaunchProps = { type: 'launch' };
export type GoToTravelProps = { type: 'travel' };
export type GoToOrbitProps = { type: 'orbit' };
export type GoToMapProps = { type: 'map' };
export type GoToPracticeProps = { type: 'practice' };
export type GoToFighterProps = { type: 'fighter' };
export type GoToProps = GoToMenuProps | GoToStartProps | GoToLaunchProps | GoToTravelProps | GoToOrbitProps | GoToMapProps | GoToPracticeProps | GoToFighterProps;

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
