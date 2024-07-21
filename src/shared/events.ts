import { Observable } from 'rxjs';

export type EventsProps = { start$: Observable<void>; destroy$: Observable<void> };
export class Events {
    public readonly start$: Observable<void>;
    public readonly destroy$: Observable<void>;

    constructor(props: EventsProps) {
        this.start$ = props.start$;
        this.destroy$ = props.destroy$;
    }
}
