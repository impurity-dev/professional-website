import * as rx from 'rxjs';

export class Events {
    public readonly current$: rx.Subject<{ index: number }> = new rx.BehaviorSubject({ index: 0 });
    public readonly goTo$: rx.Subject<{ index: number }> = new rx.Subject();
    public readonly credits$: rx.Subject<{ name: string; credits: string }> = new rx.BehaviorSubject({ name: '', credits: '' });
}
