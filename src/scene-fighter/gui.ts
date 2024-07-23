import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import * as fighterEvents from './events';
import * as sounds from './sounds';

export class FighterGui {
    private readonly gui: GUI.AdvancedDynamicTexture;
    private readonly menuClick: BABYLON.Sound;
    private readonly menuHover: BABYLON.Sound;

    constructor(props: { scene: BABYLON.Scene; events: fighterEvents.FighterEvents }) {
        const { scene, events } = props;
        this.gui = this.createGui();
        this.menuClick = sounds.menuClick({ scene });
        this.menuHover = sounds.menuHover({ scene });
        const { openOptionsMenu } = this.createOptionMenu(scene);
        events.pause.add(openOptionsMenu);
    }

    private createGui = () => {
        const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        ui.idealHeight = 1080;
        return ui;
    };

    private createOptionMenu = (
        scene: BABYLON.Scene,
    ): {
        grid: GUI.Grid;
        background: GUI.Image;
        openOptionsMenu: () => void;
        closeOptionsMenu: () => void;
    } => {
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
        toggleSound.onPointerEnterObservable.add(() => this.menuHover.play());
        toggleSound.onPointerClickObservable.add(() => {
            if (!BABYLON.Engine.audioEngine.unlocked) {
                BABYLON.Engine.audioEngine.unlock();
            } else {
                BABYLON.Engine.audioEngine.lock();
            }
            this.menuClick.play();
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
        toggleFullscreen.onPointerEnterObservable.add(() => this.menuHover.play());
        toggleFullscreen.onPointerDownObservable.add(() => {
            this.menuClick.play();
            scene.getEngine().switchFullscreen(false);
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

        const closeButton = GUI.Button.CreateImageWithCenterTextButton('close', 'Close', 'gui/Blue/ButtonB_Big/Button6.png');
        closeButton.height = '40px';
        closeButton.width = '200px';
        closeButton.color = 'white';
        closeButton.thickness = 0;
        closeButton.background = '';
        closeButton.hoverCursor = 'pointer';
        closeButton.onPointerEnterObservable.add(() => this.menuHover.play());
        closeButton.onPointerDownObservable.add(() => {
            this.menuClick.play();
            closeOptionsMenu();
        });
        grid.addControl(closeButton, 4, 1);

        this.gui.addControl(background);
        this.gui.addControl(grid);
        return { grid, background, openOptionsMenu, closeOptionsMenu };
    };
}
