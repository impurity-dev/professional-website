import * as GUI from '@babylonjs/gui';
import { interval, merge, Subject, takeUntil, tap } from 'rxjs';
import * as sm from '../shared/state-machines';

export type DialogueState = { text: string };
export type DialogueIndex = { index: number };
export class StateMachine extends sm.StateMachine<DialogueState, DialogueIndex> {
    private readonly states: DialogueState[];
    private readonly textBlock: GUI.TextBlock;
    private readonly next$: Subject<void> = new Subject();
    private readonly destroy$: Subject<void>;
    private readonly DIALOGUE_SPEED = 5;

    constructor(props: { destroy$: Subject<void>; states: DialogueState[]; textBlock: GUI.TextBlock }) {
        super();
        const { destroy$, states, textBlock } = props;
        this.states = states;
        this.destroy$ = destroy$;
        this.textBlock = textBlock;
    }

    public goTo = async (props: DialogueIndex): Promise<void> => {
        if (props.index >= this.states.length) throw Error('Dialogue index out of range');
        return this.setState(this.states[props.index]);
    };

    protected setState = async (state: DialogueState): Promise<void> => {
        this.state = state;
        const { text } = state;
        const { textBlock } = this;
        textBlock.text = '';
        this.next$.next();
        const finished$ = new Subject<void>();
        interval(this.DIALOGUE_SPEED)
            .pipe(
                tap(() => {
                    if (textBlock.text.length < text.length) {
                        textBlock.text = textBlock.text + text[textBlock.text.length];
                    } else {
                        finished$.next();
                        finished$.complete();
                    }
                }),
                takeUntil(merge(this.next$, finished$, this.destroy$)),
            )
            .subscribe();
    };
}
