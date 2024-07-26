export abstract class StateMachine<STATE, PROPS> {
    private _state: STATE;
    public get state() {
        return this._state;
    }
    protected set state(state: STATE) {
        this._state = state;
    }
    public abstract goTo(props: PROPS): Promise<void>;
    protected abstract setState(state: STATE): Promise<void>;
}
