import { BehaviorSubject, Subject } from 'rxjs';
import * as sharedModels from '../models';
import * as sharedEvents from '../shared/events';

export class Events extends sharedEvents.Events {
    readonly character$: Subject<sharedModels.CharacterType> = new BehaviorSubject({ gender: 'male', type: 'suit' });
    readonly startCutscene$: Subject<void> = new Subject();
    readonly buttonHover$: Subject<void> = new Subject();
    readonly buttonClick$: Subject<void> = new Subject();
    readonly dialogue$ = new Subject<{ text: string }>();
}
