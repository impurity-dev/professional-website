import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { MenuClickSound, MenuHoverSound } from '../sounds/menu-sound';

export type OnStart = () => void;
export type MenuGuiProps = {
    onStart: OnStart;
};

export class MenuGui {
    private readonly gui: GUI.AdvancedDynamicTexture;
    private readonly start: GUI.Button;
    private readonly optionMenu: GUI.Grid;
    private readonly options: GUI.Button;
    private readonly camera: BABYLON.Camera;
    private readonly grid: GUI.Grid;
    private readonly mask = 0x10000000;
    private readonly title: GUI.TextBlock;
    private readonly menuClick: MenuClickSound;
    private readonly menuHover: MenuHoverSound;

    constructor(
        private readonly scene: BABYLON.Scene,
        private readonly props: MenuGuiProps,
    ) {
        this.gui = this.createGui();
        this.title = this.createTitle();
        this.start = this.createStart(props.onStart);
        const { openOptionsMenu } = this.createOptionMenu();
        this.options = this.createOptions(openOptionsMenu);
        this.camera = this.createCamera();
        this.menuClick = new MenuClickSound(this.scene);
        this.menuHover = new MenuHoverSound(this.scene);
    }

    private createCamera = () => {
        const bgCamera = new BABYLON.ArcRotateCamera('BGCamera', Math.PI / 2 + Math.PI / 7, Math.PI / 2, 100, new BABYLON.Vector3(0, 20, 0), this.scene);
        bgCamera.layerMask = this.mask;
        this.scene.activeCameras.push(bgCamera);
        return bgCamera;
    };

    private createGui = () => {
        const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        ui.idealHeight = 1080;
        ui.layer.layerMask = this.mask;
        return ui;
    };

    private createTitle = () => {
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
        this.scene.beginAnimation(textBlock, 0, 60, true, 0.5);
        return textBlock;
    };

    private createStart = (onStart: OnStart): GUI.Button => {
        const button = GUI.Button.CreateImageWithCenterTextButton('start', 'Start', './gui/Blue/ButtonB_Big/Button6.png');
        button.height = '40px';
        button.width = '200px';
        button.color = 'white';
        button.thickness = 0;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.top = '260px';
        button.background = '';
        button.hoverCursor = 'pointer';
        button.onPointerEnterObservable.add(() => this.menuHover.play());
        button.onPointerDownObservable.add(() => {
            this.menuClick.play();
            onStart();
        });
        button.onPointerUpObservable.add(() => {});
        this.gui.addControl(button);
        return button;
    };

    private createOptions = (openOptionsMenu: () => void): GUI.Button => {
        const button = GUI.Button.CreateImageWithCenterTextButton('options', 'Options', './gui/Blue/ButtonB_Big/Button6.png');
        button.height = '40px';
        button.width = '200px';
        button.color = 'white';
        button.thickness = 0;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.top = '320px';
        button.background = '';
        button.hoverCursor = 'pointer';
        button.onPointerEnterObservable.add(() => this.menuHover.play());
        button.onPointerDownObservable.add(() => {
            this.menuClick.play();
            openOptionsMenu();
        });
        this.gui.addControl(button);
        return button;
    };

    private createOptionMenu = (): {
        grid: GUI.Grid;
        background: GUI.Image;
        openOptionsMenu: () => void;
        closeOptionsMenu: () => void;
    } => {
        const width = 0.5;
        const height = 0.7;
        const animationSpeed = 5;
        const startLocation = 1000;

        const background = new GUI.Image('menu', '/gui/Blue/Panels/Panel6.png');
        background.width = width;
        background.height = height;
        background.zIndex = 1;
        background.top = startLocation;

        const grid = new GUI.Grid('grid');
        // grid.background = 'red';
        grid.width = width;
        grid.height = height;
        grid.zIndex = 1;
        grid.top = startLocation;

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
            this.scene.beginAnimation(grid, 0, 60, false, animationSpeed);
            this.scene.beginAnimation(background, 0, 60, false, animationSpeed);
        };

        const closeOptionsMenu = () => {
            background.animations = [flyOut];
            grid.animations = [flyOut];
            this.scene.beginAnimation(grid, 0, 60, false, animationSpeed);
            this.scene.beginAnimation(background, 0, 60, false, animationSpeed);
        };

        this.gui.addControl(background);
        this.gui.addControl(grid);
        return { grid, background, openOptionsMenu, closeOptionsMenu };
    };
}
