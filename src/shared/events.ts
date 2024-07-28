import { Subject } from 'rxjs';

export type EventsProps = { start$: Subject<void>; destroy$: Subject<void> };
export class Events {
    public readonly start$: Subject<void>;
    public readonly destroy$: Subject<void>;

    constructor(props: EventsProps) {
        this.start$ = props.start$;
        this.destroy$ = props.destroy$;
    }
}
