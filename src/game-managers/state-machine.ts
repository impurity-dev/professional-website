import State from '../states/state';

export default abstract class StateMachine {
    private _state: State;

    public async setState(state: State): Promise<void> {
        const oldState = this._state;
        this._state = state;
        await this._state.run();
        if (oldState) oldState.dispose();
    }

    public getState(): State {
        return this._state;
    }
}
