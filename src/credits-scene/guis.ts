import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { takeUntil, tap } from 'rxjs';
import * as events from './events';

export class Gui {
    private readonly gui: GUI.AdvancedDynamicTexture;

    constructor(props: { scene: BABYLON.Scene; event: events.Events }) {
        const { scene, event } = props;
        this.gui = this.createGui({ scene });
        this.createTitle({ event });
        this.createCredits({ event });
        this.createInstructions();
        this.createGoTo({ event });
        this.createReturnToMainMenu({ event });
    }

    private createGui = (props: { scene: BABYLON.Scene }) => {
        const { scene } = props;
        const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
        ui.idealHeight = 1080;
        return ui;
    };

    private createTitle = (props: { event: events.Events }) => {
        const { event } = props;
        const textBlock = new GUI.TextBlock('title', '');
        textBlock.fontFamily = 'Zen Dots';
        textBlock.color = 'white';
        textBlock.fontSize = 30;
        textBlock.top = -500;
        event.credits$.pipe(tap(({ name }) => (textBlock.text = name))).subscribe();
        this.gui.addControl(textBlock);
    };

    private createCredits = (props: { event: events.Events }) => {
        const { event } = props;
        const textBlock = new GUI.TextBlock('credits', '');
        textBlock.fontFamily = 'Zen Dots';
        textBlock.color = 'white';
        textBlock.fontSize = 30;
        textBlock.top = 475;
        textBlock.textWrapping = true;
        event.credits$
            .pipe(
                tap(({ credits }) => (textBlock.text = credits)),
                takeUntil(event.destroy$),
            )
            .subscribe();
        this.gui.addControl(textBlock);
    };

    private createGoTo = (props: { event: events.Events }) => {
        const { event } = props;
        const button = GUI.Button.CreateImageWithCenterTextButton('go-to-credits', 'Visit Creator', 'gui/Blue/ButtonB_Big/Button6.png');
        button.height = '40px';
        button.width = '200px';
        button.color = 'white';
        button.thickness = 0;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.top = '380px';
        button.background = '';
        button.hoverCursor = 'pointer';
        let goToLink = '';
        button.onPointerEnterObservable.add(() => event.buttonHover$.next());
        button.onPointerDownObservable.add(() => {
            event.buttonClick$.next();
            window.open(goToLink, '_blank');
        });
        event.credits$
            .pipe(
                tap(({ link }) => (goToLink = link)),
                takeUntil(event.destroy$),
            )
            .subscribe();
        this.gui.addControl(button);
    };

    private createReturnToMainMenu = (props: { event: events.Events }) => {
        const { event } = props;
        const button = GUI.Button.CreateImageWithCenterTextButton('go-to-main-menu', 'Return to Main Menu', 'gui/Blue/ButtonB_Big/Button6.png');
        button.height = '40px';
        button.width = '250px';
        button.color = 'white';
        button.thickness = 0;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.top = '-500px';
        button.left = '900px';
        button.background = '';
        button.hoverCursor = 'pointer';
        button.onPointerEnterObservable.add(() => event.buttonHover$.next());
        button.onPointerDownObservable.add(() => {
            event.buttonClick$.next();
            event.returnToMainMenu$.next();
            event.returnToMainMenu$.complete();
        });
        this.gui.addControl(button);
    };

    private createInstructions = () => {
        const textBlock = new GUI.TextBlock('instructions', 'Use "A" and "D" to cycle through all the models utilized in this project.');
        textBlock.fontFamily = 'Zen Dots';
        textBlock.color = 'white';
        textBlock.fontSize = 15;
        textBlock.top = 300;
        textBlock.left = 0;
        textBlock.textWrapping = true;
        this.gui.addControl(textBlock);
    };
}
