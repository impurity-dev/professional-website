import * as sm from '../shared/state-machines';

export const launchSequence = () => new LaunchSequence({ states: launchStates });
type LaunchState = { type: 'enter' | 'dialogue' | 'start' | 'move' | 'engines' | 'launch' };
const launchStates: LaunchState[] = [{ type: 'enter' }, { type: 'dialogue' }, { type: 'start' }, { type: 'move' }, { type: 'engines' }, { type: 'launch' }];
type LaunchProps = { index: number };
class LaunchSequence extends sm.StateMachine<LaunchState, LaunchProps> {
    private readonly states: LaunchState[];

    constructor(props: { states: LaunchState[] }) {
        super();
        const { states } = props;
        this.states = states;
    }

    public goTo = async (props: LaunchProps): Promise<void> => {
        if (props.index > this.states.length) throw new Error('Invalid launch state');
        this.setState(this.states[props.index]);
    };

    protected setState = async (state: LaunchState): Promise<void> => {
        this.state = state;
    };
}
