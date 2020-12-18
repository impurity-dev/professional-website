import State from '../states/state';

export default abstract class StateMachine {
    private _state: State;

    public set state(state: State) {
        this._state = state;
        this._state.run();
    }

    public get state(): State {
        return this._state;
    }
}
