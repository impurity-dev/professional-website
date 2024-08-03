import { take, takeUntil, tap } from 'rxjs';
import * as sharedDialogues from '../dialogues';
import * as sharedModels from '../models';
import * as sm from '../shared/state-machines';
import * as localDialogues from './dialogues';
import * as localEvents from './events';
import * as settings from '../managers/settings';
import { AssetNode } from '../nodes/nodes';

export const stateMachine = (props: { events: localEvents.Events; dialogueBox: sharedDialogues.DialogueBox; characters: CharacterMetadata[] }) =>
    new CharacterStateMachine({
        events: props.events,
        selectionSM: new SelectionStateMachine({ characters: props.characters }),
        robotSM: new sharedDialogues.StateMachine({ destroy$: props.events.destroy$, states: localDialogues.robotStates, dialogueBox: props.dialogueBox }),
    });

export type CharacterState =
    | {
          type: 'selection';
          props: SelectionProps;
      }
    | {
          type: 'dialogue';
          props: { index: number };
      }
    | { type: 'exit' };
type CharacterStateMachineProps = {
    events: localEvents.Events;
    robotSM: sm.StateMachine<sharedDialogues.DialogueState, sharedDialogues.DialogueIndex>;
    selectionSM: sm.StateMachine<SelectionState, SelectionProps>;
};
export class CharacterStateMachine extends sm.StateMachine<CharacterState, CharacterState> {
    private readonly robotSM: sm.StateMachine<sharedDialogues.DialogueState, sharedDialogues.DialogueIndex>;
    private readonly selectionSM: sm.StateMachine<SelectionState, SelectionProps>;

    constructor(props: CharacterStateMachineProps) {
        super();
        const { events, robotSM, selectionSM } = props;
        this.robotSM = robotSM;
        this.selectionSM = selectionSM;
        events.start$
            .pipe(
                take(1),
                tap(() => events.state$.pipe(tap(this.goTo), takeUntil(events.destroy$)).subscribe()),
            )
            .subscribe();
    }

    public goTo = async (props: CharacterState): Promise<void> => {
        switch (props.type) {
            case 'selection': {
                this.selectionSM.goTo(props.props);
                break;
            }
            case 'dialogue': {
                this.robotSM.goTo(props.props);
                break;
            }
            case 'exit': {
                break;
            }
            default:
                throw new Error(`Invalid state for character state machine: ${props}`);
        }
        this.setState(props);
    };
    protected setState = async (state: CharacterState): Promise<void> => {
        this.state = state;
    };
}

export type CharacterMetadata = { model: AssetNode } & sharedModels.CharacterType;
type SelectionState = { character: sharedModels.CharacterType };
type SelectionProps = { index: number };
class SelectionStateMachine extends sm.StateMachine<SelectionState, SelectionProps> {
    private current: CharacterMetadata;
    private readonly characters: CharacterMetadata[];

    constructor(props: { characters: CharacterMetadata[] }) {
        super();
        this.characters = props.characters;
    }

    public goTo = async (props: SelectionProps): Promise<void> => {
        this.setState({
            character: this.characters[Math.abs(props.index) % this.characters.length],
        });
    };

    protected setState = async (state: SelectionState): Promise<void> => {
        this.current?.model.setEnabled(false);
        this.current = this.characters.find((character) => character.gender === state.character.gender && character.type === state.character.type);
        this.current?.model.setEnabled(true);
        settings.game.character = state.character;
    };
}
