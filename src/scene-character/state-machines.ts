import * as GUI from '@babylonjs/gui';
import { filter, take, takeUntil, tap } from 'rxjs';
import * as sharedDialogues from '../dialogues';
import * as sharedModels from '../models';
import * as sm from '../shared/state-machines';
import * as localDialogues from './dialogues';
import * as localEvents from './events';

export const robotSM = (props: { events: localEvents.Events; textBlock: GUI.TextBlock }) =>
    new sharedDialogues.StateMachine({ destroy$: props.events.destroy$, states: localDialogues.robotStates, textBlock: props.textBlock });
export const selectionSM = (props: { events: localEvents.Events; lookup: CharacterLookup }) => new SelectionStateMachine(props);
export const stateMachine = (props: CharacterStateMachineProps) => new CharacterStateMachine(props);

export type CharacterState =
    | { type: 'selection'; character: sharedModels.CharacterType }
    | { type: 'dialogue'; diaglogue: { index: number } }
    | { type: 'exit' };
type CharacterStateMachineProps = {
    events: localEvents.Events;
    robotSM: sm.StateMachine<sharedDialogues.DialogueState, sharedDialogues.DialogueIndex>;
    selectionSM: sm.StateMachine<sharedModels.CharacterType, sharedModels.CharacterType>;
};
export class CharacterStateMachine extends sm.StateMachine<CharacterState, CharacterState> {
    private readonly robotSM: sm.StateMachine<sharedDialogues.DialogueState, sharedDialogues.DialogueIndex>;
    private readonly selectionSM: sm.StateMachine<sharedModels.CharacterType, sharedModels.CharacterType>;

    constructor(props: CharacterStateMachineProps) {
        super();
        const { events, robotSM, selectionSM } = props;
        this.robotSM = robotSM;
        this.selectionSM = selectionSM;
        events.state$.pipe(tap(this.setState), takeUntil(events.destroy$)).subscribe();
    }

    public goTo = async (props: CharacterState): Promise<void> => {
        switch (props.type) {
            case 'selection': {
                this.selectionSM.goTo(props.character);
                break;
            }
            case 'dialogue': {
                this.robotSM.goTo(props.diaglogue);
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
class SelectionStateMachine extends sm.StateMachine<sharedModels.CharacterType, sharedModels.CharacterType> {
    private character: sharedModels.Model;
    private readonly lookup: CharacterLookup;

    constructor(props: { events: localEvents.Events; lookup: CharacterLookup }) {
        super();
        const { events, lookup } = props;
        this.lookup = lookup;
        events.start$
            .pipe(
                take(1),
                tap(() => {
                    events.state$
                        .pipe(
                            filter((state) => state.type === 'selection'),
                            tap((state) => this.goTo(state.character)),
                            takeUntil(events.destroy$),
                        )
                        .subscribe();
                }),
            )
            .subscribe();
    }

    public goTo = async (props: sharedModels.CharacterType): Promise<void> => {
        this.setState(props);
    };

    protected setState = async (state: sharedModels.CharacterType): Promise<void> => {
        this.character?.transform.setEnabled(false);
        this.character = this.lookup[state.gender][state.type];
        this.character.transform.setEnabled(true);
    };
}
