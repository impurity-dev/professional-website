import { BehaviorSubject, Subject } from 'rxjs';
import * as sharedModels from '../models';
import * as sharedEvents from '../shared/events';
import * as localSm from './state-machines';

export class Events extends sharedEvents.Events {
    readonly character$: Subject<sharedModels.CharacterType> = new BehaviorSubject({ gender: 'male', type: 'suit' });
    readonly state$ = new BehaviorSubject<localSm.CharacterState>({ type: 'selection', character: { gender: 'male', type: 'suit' } });
    readonly buttonHover$: Subject<void> = new Subject();
    readonly buttonClick$: Subject<void> = new Subject();
}
