import * as GUI from '@babylonjs/gui';

export class DialogueBox {
    private readonly titleTB: GUI.TextBlock;
    private readonly dialogueTB: GUI.TextBlock;
    private readonly backgroundIMG: GUI.Image;
    private readonly grid: GUI.Grid;

    constructor(props: { ui: GUI.AdvancedDynamicTexture }) {
        const { ui } = props;
        const width = 0.6;
        const height = 0.2;

        this.backgroundIMG = new GUI.Image('menu', 'gui/Blue/Panels/Panel1.png');
        this.backgroundIMG.width = width;
        this.backgroundIMG.height = height;
        this.backgroundIMG.top = 300;
        ui.addControl(this.backgroundIMG);

        this.grid = new GUI.Grid('dialogueGrid');
        this.grid.top = 300;
        this.grid.width = width;
        this.grid.height = height;
        this.grid.addColumnDefinition(1);
        this.grid.addRowDefinition(0.25);
        this.grid.addRowDefinition(0.75);
        ui.addControl(this.grid);

        this.titleTB = new GUI.TextBlock('title', '');
        this.titleTB.fontFamily = 'Zen Dots';
        this.titleTB.color = 'white';
        this.titleTB.top = 15;
        this.titleTB.fontSize = 15;
        this.titleTB.width = 0.9;
        this.titleTB.height = 0.8;
        this.grid.addControl(this.titleTB, 0, 0);

        this.dialogueTB = new GUI.TextBlock('dialogue', '');
        this.dialogueTB.fontFamily = 'Zen Dots';
        this.dialogueTB.color = 'white';
        this.dialogueTB.fontSize = 15;
        this.dialogueTB.width = 0.9;
        this.dialogueTB.height = 0.8;
        this.dialogueTB.textWrapping = true;
        this.grid.addControl(this.dialogueTB, 1, 0);
    }

    get title() {
        return this.titleTB.text;
    }

    get text() {
        return this.dialogueTB.text;
    }

    set title(title: string) {
        this.titleTB.text = title;
    }

    set text(text: string) {
        this.dialogueTB.text = text;
    }

    toggle = (isVisible: boolean) => {
        this.titleTB.isVisible = isVisible;
        this.dialogueTB.isVisible = isVisible;
        this.backgroundIMG.isVisible = isVisible;
    };
}
