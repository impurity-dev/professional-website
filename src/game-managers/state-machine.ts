import State from '../states/state.js';

export type GoToStartProps = { type: 'start' };
export type GoToTravelProps = { type: 'travel' };
export type GoToOrbitProps = { type: 'orbit' };
export type GoToMapProps = { type: 'map' };
export type GoToProps = GoToStartProps | GoToTravelProps | GoToOrbitProps | GoToMapProps;

export default abstract class StateMachine {
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
