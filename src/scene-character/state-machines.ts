import * as GUI from '@babylonjs/gui';
import { takeUntil, tap } from 'rxjs';
import * as sharedDialogues from '../dialogues';
import * as sm from '../shared/state-machines';
import * as localDialogues from './dialogues';
import * as localEvents from './events';

export type CharacterState = { type: 'selection' | 'exit' } | { type: 'dialogue'; index: number };
type CharacterStateMachineProps = { robot: { textBlock: GUI.TextBlock } } & { events: localEvents.Events };
export class CharacterStateMachine extends sm.StateMachine<CharacterState, CharacterState> {
    private readonly robotSM: sharedDialogues.StateMachine;

    constructor(props: CharacterStateMachineProps) {
        super();
        const { events, robot } = props;
        this.robotSM = new sharedDialogues.StateMachine({
            destroy$: events.destroy$,
            states: localDialogues.robotStates,
            textBlock: robot.textBlock,
        });
        events.state$.pipe(tap(this.setState), takeUntil(events.destroy$)).subscribe();
    }

    public goTo = async (props: CharacterState): Promise<void> => {
        this.setState(props);
    };
    protected setState = async (state: CharacterState): Promise<void> => {
        this.state = state;
        if (state.type === 'dialogue') {
            this.robotSM.goTo({ index: state.index });
        }
    };
}

export const stateMachine = (props: CharacterStateMachineProps) => new CharacterStateMachine(props);
