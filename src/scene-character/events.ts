import { BehaviorSubject, Subject } from 'rxjs';
import * as sharedEvents from '../shared/events';
import * as localSm from './state-machines';

export class Events extends sharedEvents.Events {
    readonly state$ = new BehaviorSubject<localSm.CharacterState>({ type: 'selection', props: { index: 0 } });
    readonly buttonHover$: Subject<void> = new Subject();
    readonly buttonClick$: Subject<void> = new Subject();
}
