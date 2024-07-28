import * as GUI from '@babylonjs/gui';
import { take, takeUntil, tap } from 'rxjs';
import * as sharedDialogues from '../dialogues';
import * as sharedModels from '../models';
import * as sm from '../shared/state-machines';
import * as localDialogues from './dialogues';
import * as localEvents from './events';

export const stateMachine = (props: { events: localEvents.Events; textBlock: GUI.TextBlock; lookup: CharacterLookup }) =>
    new CharacterStateMachine({
        events: props.events,
        selectionSM: new SelectionStateMachine({ lookup: props.lookup }),
        robotSM: new sharedDialogues.StateMachine({ destroy$: props.events.destroy$, states: localDialogues.robotStates, textBlock: props.textBlock }),
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
    selectionSM: sm.StateMachine<sharedModels.CharacterType, SelectionProps>;
};
export class CharacterStateMachine extends sm.StateMachine<CharacterState, CharacterState> {
    private readonly robotSM: sm.StateMachine<sharedDialogues.DialogueState, sharedDialogues.DialogueIndex>;
    private readonly selectionSM: sm.StateMachine<sharedModels.CharacterType, SelectionProps>;

    constructor(props: CharacterStateMachineProps) {
        super();
        const { events, robotSM, selectionSM } = props;
        this.robotSM = robotSM;
        this.selectionSM = selectionSM;
        events.start$
            .pipe(
                take(1),
                tap(() => {
                    events.state$.pipe(tap(this.goTo), takeUntil(events.destroy$)).subscribe();
                }),
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

export type CharacterLookup = {
    male: {
        adventurer: sharedModels.Model;
        beach: sharedModels.Model;
        casual: sharedModels.Model;
        farmer: sharedModels.Model;
        hoodie: sharedModels.Model;
        king: sharedModels.Model;
        punk: sharedModels.Model;
        spacesuit: sharedModels.Model;
        suit: sharedModels.Model;
        swat: sharedModels.Model;
        worker: sharedModels.Model;
    };
    female: {
        adventurer: sharedModels.Model;
        casual: sharedModels.Model;
        formal: sharedModels.Model;
        medieval: sharedModels.Model;
        punk: sharedModels.Model;
        sciFi: sharedModels.Model;
        soldier: sharedModels.Model;
        suit: sharedModels.Model;
        witch: sharedModels.Model;
        worker: sharedModels.Model;
    };
};

type SelectionProps = { character: sharedModels.CharacterType };
class SelectionStateMachine extends sm.StateMachine<sharedModels.CharacterType, SelectionProps> {
    private character: sharedModels.Model;
    private readonly lookup: CharacterLookup;

    constructor(props: { lookup: CharacterLookup }) {
        super();
        const { lookup } = props;
        this.lookup = lookup;
    }

    public goTo = async (props: SelectionProps): Promise<void> => {
        this.setState(props.character);
    };

    protected setState = async (state: sharedModels.CharacterType): Promise<void> => {
        this.character?.transform.setEnabled(false);
        this.character = this.lookup[state.gender][state.type];
        this.character.transform.setEnabled(true);
    };
}
