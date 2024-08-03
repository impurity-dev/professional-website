import * as sharedEvents from '../shared/events';
import { BehaviorSubject, Subject } from 'rxjs';

export type Interactables = {
    type: 'fighter' | 'github' | 'none';
};
export type Actions = {
    type: 'fighter';
};
export type ActionType = { type: 'launch' };
export class Events extends sharedEvents.Events {
    public readonly interactables$: BehaviorSubject<Interactables> = new BehaviorSubject<Interactables>({ type: 'none' });
    public readonly actions$: Subject<Actions> = new Subject<Actions>();
}
