import { take, takeUntil, tap } from 'rxjs';
import * as sm from '../shared/state-machines';
import * as localEvents from './events';

export const launchSequence = (props: { events: localEvents.Events }) => new LaunchSequence({ events: props.events, states: launchStates });
type LaunchState = { type: 'enter' | 'dialogue' | 'start' | 'move' | 'engines' | 'launch' };
const launchStates: LaunchState[] = [{ type: 'enter' }, { type: 'dialogue' }, { type: 'start' }, { type: 'move' }, { type: 'engines' }, { type: 'launch' }];
type LaunchProps = { index: number };
class LaunchSequence extends sm.StateMachine<LaunchState, LaunchProps> {
    private readonly states: LaunchState[];

    constructor(props: { events: localEvents.Events; states: LaunchState[] }) {
        super();
        const { states, events } = props;
        this.states = states;
        events.start$
            .pipe(
                take(1),
                tap(() => events.state$.pipe(tap(this.goTo), takeUntil(events.destroy$)).subscribe()),
            )
            .subscribe();
    }

    public goTo = async (props: LaunchProps): Promise<void> => {
        if (props.index > this.states.length) throw new Error('Invalid launch state');
        this.setState(this.states[props.index]);
    };

    protected setState = async (state: LaunchState): Promise<void> => {
        this.state = state;
    };
}
