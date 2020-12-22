import State from '../states/state';

export default abstract class StateMachine {
    private _state: State;

    public async setState(state: State): Promise<void> {
        this._state = state;
        await this._state.run();
    }

    public getState(): State {
        return this._state;
    }
}
