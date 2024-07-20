import * as rx from 'rxjs';

export class Events {
    public readonly current$: rx.Subject<{ index: number }> = new rx.Subject();
    public readonly goTo$: rx.Subject<{ index: number }> = new rx.Subject();
}
