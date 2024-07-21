import * as rx from 'rxjs';
import * as sharedEvents from '../shared/events';

export class Events extends sharedEvents.Events {
    public readonly current$: rx.Subject<{ index: number }> = new rx.BehaviorSubject({ index: 0 });
    public readonly goTo$: rx.Subject<{ index: number }> = new rx.Subject();
    public readonly credits$: rx.Subject<{ name: string; credits: string; link: string }> = new rx.BehaviorSubject({ name: '', credits: '', link: '' });
    public readonly returnToMainMenu$: rx.Subject<void> = new rx.Subject();
    public readonly buttonHover$: rx.Subject<void> = new rx.Subject();
    public readonly buttonClick$: rx.Subject<void> = new rx.Subject();

    constructor(props: sharedEvents.EventsProps) {
        super(props);
    }
}
