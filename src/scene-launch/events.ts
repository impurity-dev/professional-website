import { BehaviorSubject } from 'rxjs';
import * as sharedEvents from '../shared/events';
export class Events extends sharedEvents.Events {
    public readonly state$: BehaviorSubject<{}> = new BehaviorSubject({});
}
