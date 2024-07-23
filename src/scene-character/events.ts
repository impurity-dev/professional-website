import { BehaviorSubject, Subject } from 'rxjs';
import * as sharedEvents from '../shared/events';

export type CharactersEvent =
    | {
          gender: 'male';
          type: 'adventurer' | 'beach' | 'casual' | 'casualHoodie' | 'farmer' | 'king' | 'punk' | 'spacesuit' | 'suit' | 'swat' | 'worker';
      }
    | {
          gender: 'female';
          type: 'adventurer' | 'casual' | 'formal' | 'medieval' | 'punk' | 'sciFi' | 'soldier' | 'suit' | 'witch' | 'worker';
      };
export class Events extends sharedEvents.Events {
    readonly character$: Subject<CharactersEvent> = new BehaviorSubject({ gender: 'male', type: 'suit' });
}
