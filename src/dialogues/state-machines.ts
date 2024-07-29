import { interval, merge, Subject, takeUntil, tap } from 'rxjs';
import * as sm from '../shared/state-machines';
import * as sharedDialogues from '../dialogues';

export type DialogueState = { name: string; text: string; buttons?: string[]; input?: string };
export type DialogueIndex = { index: number };
export class StateMachine extends sm.StateMachine<DialogueState, DialogueIndex> {
    private readonly states: DialogueState[];
    private readonly dialogueBox: sharedDialogues.DialogueBox;
    private readonly next$: Subject<void> = new Subject();
    private readonly destroy$: Subject<void>;
    private readonly DIALOGUE_SPEED = 5;

    constructor(props: { destroy$: Subject<void>; states: DialogueState[]; dialogueBox: sharedDialogues.DialogueBox }) {
        super();
        const { destroy$, states, dialogueBox } = props;
        this.states = states;
        this.destroy$ = destroy$;
        this.dialogueBox = dialogueBox;
    }

    public goTo = async (props: DialogueIndex): Promise<void> => {
        if (props.index >= this.states.length) throw Error('Dialogue index out of range');
        return this.setState(this.states[props.index]);
    };

    protected setState = async (state: DialogueState): Promise<void> => {
        this.state = state;
        const { text } = state;
        this.dialogueBox.text = '';
        this.next$.next();
        const finished$ = new Subject<void>();
        this.dialogueBox.title = state.name;
        interval(this.DIALOGUE_SPEED)
            .pipe(
                tap(() => {
                    if (this.dialogueBox.text.length < text.length) {
                        this.dialogueBox.text = this.dialogueBox.text + text[this.dialogueBox.text.length];
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
