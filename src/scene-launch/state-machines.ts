import { take, takeUntil, tap } from 'rxjs';
import * as sm from '../shared/state-machines';
import * as localEvents from './events';

export const launchSequence = (props: { events: localEvents.Events }) => new LaunchSequence({ events: props.events });
export type LaunchState = { type: 'enter' | 'dialogue' | 'monitors' | 'engines' | 'launch' | 'space' };
class LaunchSequence extends sm.StateMachine<LaunchState, LaunchState> {
    constructor(props: { events: localEvents.Events }) {
        super();
        const { events } = props;
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
