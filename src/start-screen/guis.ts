import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as events from './events';

export class MenuGui {
    private readonly gui: GUI.AdvancedDynamicTexture;

    constructor(props: { scene: BABYLON.Scene; mask: number; event: events.Events }) {
        const { scene, mask, event } = props;
        this.gui = this.createGui(mask);
        this.createTitle(scene);
        this.createWIP();
        this.createStart(event);
        this.createOptionMenu(scene, event);
        this.createOptions(event);
        this.createCredits(event);
        this.createFAQ(event);
    }

    private createGui = (mask: number) => {
        const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        ui.idealHeight = 1080;
        ui.layer.layerMask = mask;
        return ui;
    };

    private createWIP = () => {
        const textBlock = new GUI.TextBlock('wip', 'Work in Progress');
        textBlock.top = '-200';
        textBlock.color = new BABYLON.Color4(1, 1, 0, 1).toHexString();
        textBlock.outlineColor = new BABYLON.Color4(1, 1, 0, 1).toHexString();
        textBlock.outlineWidth = 1;
        textBlock.fontSize = '75px';
        textBlock.shadowColor = new BABYLON.Color4(0, 0.5, 0.5, 1).toHexString();
        textBlock.shadowBlur = 100;
        textBlock.underline = true;
        textBlock.fontFamily = 'Zen Dots';
        textBlock.fontWeight = '400';
        textBlock.fontStyle = 'normal';
        this.gui.addControl(textBlock);
        return textBlock;
    };

    private createTitle = (scene: BABYLON.Scene) => {
        const textBlock = new GUI.TextBlock('title', 'Tyler Kokoszka');
        textBlock.top = '-350';
        textBlock.color = new BABYLON.Color4(0, 1, 1, 1).toHexString();
        textBlock.outlineColor = new BABYLON.Color4(0, 1, 1, 1).toHexString();
        textBlock.outlineWidth = 1;
        textBlock.fontSize = '150px';
        textBlock.shadowColor = new BABYLON.Color4(0, 0.5, 0.5, 1).toHexString();
        textBlock.shadowBlur = 100;
        textBlock.underline = true;
        const pulse = new BABYLON.Animation('pulse', 'alpha', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_YOYO);
        pulse.setKeys([
            { frame: 0, value: 0 },
            { frame: 60, value: 1 },
        ]);
        textBlock.animations = [pulse];
        textBlock.fontFamily = 'Zen Dots';
        textBlock.fontWeight = '400';
        textBlock.fontStyle = 'normal';
        this.gui.addControl(textBlock);
        scene.beginAnimation(textBlock, 0, 60, true, 0.5);
        return textBlock;
    };

    private createFAQ = (event: events.Events): GUI.Button => {
        const button = GUI.Button.CreateImageWithCenterTextButton('faq', 'FAQ', 'gui/Blue/ButtonB_Big/Button6.png');
        button.height = '40px';
        button.width = '200px';
        button.color = 'white';
        button.thickness = 0;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.top = '440px';
        button.background = '';
        button.hoverCursor = 'pointer';
        button.onPointerEnterObservable.add(() => event.onHover.notifyObservers());
        button.onPointerDownObservable.add(() => {
            alert('todo');
            event.onClick.notifyObservers();
        });
        this.gui.addControl(button);
        return button;
    };

    private createCredits = (event: events.Events): GUI.Button => {
        const button = GUI.Button.CreateImageWithCenterTextButton('credits', 'Credits', 'gui/Blue/ButtonB_Big/Button6.png');
        button.height = '40px';
        button.width = '200px';
        button.color = 'white';
        button.thickness = 0;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.top = '380px';
        button.background = '';
        button.hoverCursor = 'pointer';
        button.onPointerEnterObservable.add(() => event.onHover.notifyObservers());
        button.onPointerDownObservable.add(() => {
            alert('todo');
            event.onClick.notifyObservers();
        });
        this.gui.addControl(button);
        return button;
    };

    private createStart = (event: events.Events): GUI.Button => {
        const button = GUI.Button.CreateImageWithCenterTextButton('start', 'Start', 'gui/Blue/ButtonB_Big/Button6.png');
        button.height = '40px';
        button.width = '200px';
        button.color = 'white';
        button.thickness = 0;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.top = '260px';
        button.background = '';
        button.hoverCursor = 'pointer';
        button.onPointerEnterObservable.add(() => event.onHover.notifyObservers());
        button.onPointerDownObservable.add(() => {
            event.onClick.notifyObservers();
            event.onStart.notifyObservers();
        });
        button.onPointerUpObservable.add(() => {});
        this.gui.addControl(button);
        return button;
    };

    private createOptions = (event: events.Events): GUI.Button => {
        const button = GUI.Button.CreateImageWithCenterTextButton('options', 'Options', 'gui/Blue/ButtonB_Big/Button6.png');
        button.height = '40px';
        button.width = '200px';
        button.color = 'white';
        button.thickness = 0;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.top = '320px';
        button.background = '';
        button.hoverCursor = 'pointer';
        button.onPointerEnterObservable.add(() => event.onHover.notifyObservers());
        button.onPointerDownObservable.add(() => {
            event.onOptions.notifyObservers({ toggle: true });
            event.onClick.notifyObservers();
        });
        this.gui.addControl(button);
        return button;
    };

    private createOptionMenu = (scene: BABYLON.Scene, event: events.Events) => {
        const width = 0.3;
        const height = 0.5;
        const animationSpeed = 5;
        const startLocation = 1000;

        const background = new GUI.Image('menu', 'gui/Blue/Panels/Panel6.png');
        background.width = width;
        background.height = height;
        background.zIndex = 1;
        background.top = startLocation;

        const grid = new GUI.Grid('grid');
        grid.width = width;
        grid.height = height;
        grid.zIndex = 1;
        grid.top = startLocation;
        grid.addRowDefinition(0.2);
        grid.addRowDefinition(0.2);
        grid.addRowDefinition(0.2);
        grid.addRowDefinition(0.2);
        grid.addRowDefinition(0.2);
        grid.addColumnDefinition(0.2);
        grid.addColumnDefinition(0.2);

        const title = new GUI.TextBlock('options-menu-title-01', 'Game');
        title.fontFamily = 'Zen Dots';
        title.color = 'white';
        title.fontSize = 30;
        grid.addControl(title, 0, 0);

        const title2 = new GUI.TextBlock('options-menu-title-02', 'Options');
        title2.fontFamily = 'Zen Dots';
        title2.color = 'white';
        title2.fontSize = 30;
        grid.addControl(title2, 0, 1);

        BABYLON.Engine.audioEngine.useCustomUnlockedButton = true;
        const toggleSound = new GUI.Checkbox('toggle-sound');
        toggleSound.widthInPixels = 50;
        toggleSound.heightInPixels = 50;
        toggleSound.hoverCursor = 'pointer';
        toggleSound.isChecked = BABYLON.Engine.audioEngine.unlocked;
        toggleSound.onPointerEnterObservable.add(() => event.onHover.notifyObservers());
        toggleSound.onPointerClickObservable.add(() => {
            if (!BABYLON.Engine.audioEngine.unlocked) {
                BABYLON.Engine.audioEngine.unlock();
            } else {
                BABYLON.Engine.audioEngine.lock();
            }
            event.onClick.notifyObservers();
        });
        grid.addControl(toggleSound, 1, 0);

        const toggleSoundText = new GUI.TextBlock('toggle-sound-label', 'Sound');
        toggleSoundText.color = 'white';
        toggleSoundText.fontFamily = 'Zen Dots';
        grid.addControl(toggleSoundText, 1, 1);

        const toggleFullscreen = new GUI.Checkbox('toggle-fullscreen');
        toggleFullscreen.widthInPixels = 50;
        toggleFullscreen.heightInPixels = 50;
        toggleFullscreen.hoverCursor = 'pointer';
        toggleFullscreen.isChecked = scene.getEngine().isFullscreen;
        toggleFullscreen.onPointerEnterObservable.add(() => event.onHover.notifyObservers());
        toggleFullscreen.onPointerDownObservable.add(() => {
            scene.getEngine().switchFullscreen(false);
            event.onClick.notifyObservers();
        });
        grid.addControl(toggleFullscreen, 2, 0);

        const toggleFullscreenText = new GUI.TextBlock('toggle-fullscreen-label', 'Fullscreen');
        toggleFullscreenText.color = 'white';
        toggleFullscreenText.fontFamily = 'Zen Dots';
        grid.addControl(toggleFullscreenText, 2, 1);

        const flyIn = new BABYLON.Animation('fly-in', 'top', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        flyIn.setKeys([
            { frame: 0, value: startLocation },
            { frame: 60, value: 0 },
        ]);

        const flyOut = new BABYLON.Animation('fly-out', 'top', 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        flyOut.setKeys([
            { frame: 0, value: 0 },
            { frame: 60, value: startLocation },
        ]);

        const closeButton = GUI.Button.CreateImageWithCenterTextButton('close', 'Close', 'gui/Blue/ButtonB_Big/Button6.png');
        closeButton.height = '40px';
        closeButton.width = '200px';
        closeButton.color = 'white';
        closeButton.thickness = 0;
        closeButton.background = '';
        closeButton.hoverCursor = 'pointer';
        closeButton.onPointerEnterObservable.add(() => event.onHover.notifyObservers());
        closeButton.onPointerDownObservable.add(() => {
            event.onClick.notifyObservers();
            event.onOptions.notifyObservers({ toggle: false });
        });
        grid.addControl(closeButton, 4, 1);
        this.gui.addControl(background);
        this.gui.addControl(grid);

        const openOptionsMenu = () => {
            background.animations = [flyIn];
            grid.animations = [flyIn];
            scene.beginAnimation(grid, 0, 60, false, animationSpeed);
            scene.beginAnimation(background, 0, 60, false, animationSpeed);
        };

        const closeOptionsMenu = () => {
            background.animations = [flyOut];
            grid.animations = [flyOut];
            scene.beginAnimation(grid, 0, 60, false, animationSpeed);
            scene.beginAnimation(background, 0, 60, false, animationSpeed);
        };
        event.onOptions.add(({ toggle }) => (toggle ? openOptionsMenu() : closeOptionsMenu()));
    };
}