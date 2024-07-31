import { take, takeUntil, tap } from 'rxjs';
import * as sm from '../shared/state-machines';
import * as localEvents from './events';

export const launchSequence = (props: { events: localEvents.Events }) => new LaunchSequence({ events: props.events, states: launchStates });
export type LaunchState = { type: 'enter' | 'dialogue' | 'start' | 'move' | 'engines' | 'launch' };
const launchStates: LaunchState[] = [{ type: 'enter' }, { type: 'dialogue' }, { type: 'start' }, { type: 'move' }, { type: 'engines' }, { type: 'launch' }];
class LaunchSequence extends sm.StateMachine<LaunchState, LaunchState> {
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

    public goTo = async (props: LaunchState): Promise<void> => {
        this.setState(props);
    };

    protected setState = async (state: LaunchState): Promise<void> => {
        this.state = state;
    };
}
