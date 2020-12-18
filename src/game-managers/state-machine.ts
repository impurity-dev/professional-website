import State from './state';

export default abstract class StateMachine {
    private state: State;

    public setState(state: State): void {
        this.state = state;
        this.state.run();
    }

    public getState(): State {
        return this.state;
    }
}
