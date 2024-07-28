import * as GUI from '@babylonjs/gui';
import { takeUntil, tap } from 'rxjs';
import * as sharedDialogues from '../dialogues';
import * as sharedModels from '../models';
import * as sm from '../shared/state-machines';
import * as localDialogues from './dialogues';
import * as localEvents from './events';

export const stateMachine = (props: CharacterStateMachineProps) => new CharacterStateMachine(props);
export type CharacterState = { type: 'selection'; character: sharedModels.CharacterType } | { type: 'dialogue'; index: number } | { type: 'exit' };
type CharacterStateMachineProps = { robot: { textBlock: GUI.TextBlock } } & { events: localEvents.Events };
export class CharacterStateMachine extends sm.StateMachine<CharacterState, CharacterState> {
    private readonly robotSM: sm.StateMachine<sharedDialogues.DialogueState, sharedDialogues.DialogueIndex>;
    private readonly selectionSM: sm.StateMachine<SelectionState, SelectionState>;

    constructor(props: CharacterStateMachineProps) {
        super();
        const { events, robot } = props;
        this.robotSM = new sharedDialogues.StateMachine({ destroy$: events.destroy$, states: localDialogues.robotStates, textBlock: robot.textBlock });
        this.selectionSM = new SelectionStateMachine({ events });
        events.state$.pipe(tap(this.setState), takeUntil(events.destroy$)).subscribe();
    }

    public goTo = async (props: CharacterState): Promise<void> => {
        this.setState(props);
    };
    protected setState = async (state: CharacterState): Promise<void> => {
        this.state = state;
        switch (state.type) {
            case 'selection':
                return this.selectionSM.goTo(state);
            case 'dialogue':
                return this.robotSM.goTo(state);
            case 'exit':
                return;
            default:
                throw new Error(`Invalid state for character state machine: ${state}`);
        }
    };
}

type SelectionState = {};
class SelectionStateMachine extends sm.StateMachine<SelectionState, SelectionState> {
    constructor(props: { events: localEvents.Events }) {
        super();
        const { events } = props;
    }

    public goTo(props: SelectionState): Promise<void> {
        throw new Error('Method not implemented.');
    }
    protected setState(state: SelectionState): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
