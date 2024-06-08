import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';

export type OnStart = () => void;
export type MenuGuiProps = {
    onStart: OnStart;
};

export class MenuGui {
    private readonly gui: GUI.AdvancedDynamicTexture;
    private readonly start: GUI.Button;
    private readonly options: GUI.Button;
    private readonly camera: BABYLON.Camera;
    private readonly grid: GUI.Grid;
    private readonly mask = 0x10000000;
    private readonly title: GUI.TextBlock;

    constructor(
        private readonly scene: BABYLON.Scene,
        private readonly props: MenuGuiProps,
    ) {
        this.gui = this.createGui();
        this.title = this.createTitle();
        this.start = this.createStart(props.onStart);
        this.options = this.createOptions();
        this.camera = this.createCamera();
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
        button.onPointerDownObservable.add(() => {});
        button.onPointerUpObservable.add(() => {});
        button.onPointerDownObservable.add(onStart);
        this.gui.addControl(button);
        return button;
    };

    private createOptions = (): GUI.Button => {
        const button = GUI.Button.CreateImageWithCenterTextButton('options', 'Options', './gui/Blue/ButtonB_Big/Button6.png');
        button.height = '40px';
        button.width = '200px';
        button.color = 'white';
        button.thickness = 0;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        button.top = '320px';
        button.background = '';
        button.hoverCursor = 'pointer';
        button.onPointerDownObservable.add(() => {});
        button.onPointerUpObservable.add(() => {});
        this.gui.addControl(button);
        return button;
    };
}
