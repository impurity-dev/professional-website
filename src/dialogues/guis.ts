import * as GUI from '@babylonjs/gui';

export class DialogueBox {
    private readonly textBlock: GUI.TextBlock;
    private readonly background: GUI.Image;

    constructor(props: { ui: GUI.AdvancedDynamicTexture }) {
        const { ui } = props;
        const width = 0.6;
        const height = 0.2;

        this.background = new GUI.Image('menu', 'gui/Blue/Panels/Panel1.png');
        this.background.width = width;
        this.background.height = height;
        this.background.top = 300;

        this.textBlock = new GUI.TextBlock('dialogue', '');
        this.textBlock.fontFamily = 'Zen Dots';
        this.textBlock.color = 'white';
        this.textBlock.fontSize = 15;
        this.textBlock.top = 300;
        this.textBlock.alpha = 1;
        this.textBlock.width = width - 0.1;
        this.textBlock.height = height;
        this.textBlock.textWrapping = true;
        ui.addControl(this.background);
        ui.addControl(this.textBlock);
    }

    get text() {
        return this.textBlock.text;
    }

    set text(text: string) {
        this.textBlock.text = text;
    }

    toggle = (isOpen: boolean) => {
        this.textBlock.isVisible = isOpen;
        this.background.isVisible = isOpen;
    };
}
