import { BehaviorSubject } from 'rxjs';
import * as sharedEvents from '../shared/events';
import * as sm from './state-machines';

export class Events extends sharedEvents.Events {
    public readonly state$: BehaviorSubject<sm.LaunchState> = new BehaviorSubject({ type: 'enter' });
}
