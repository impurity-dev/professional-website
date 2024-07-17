import { State } from '../shared/state.js';

export type GoToType = 'menu' | 'orbit' | 'launch' | 'travel' | 'orbit' | 'practice' | 'map' | 'hub' | 'fighter';
export type GoToProps = { type: GoToType };
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
