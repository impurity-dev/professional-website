import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { from } from 'rxjs';

export class DialogueManager {
    private readonly scene: BABYLON.Scene;
    private readonly textBlock: GUI.TextBlock;

    constructor(props: { scene: BABYLON.Scene; textBlock: GUI.TextBlock }) {
        const { scene, textBlock } = props;
        this.scene = scene;
        this.textBlock = textBlock;
    }

    addText = (props: { text: string }) => {
        const { text } = props;
        const { textBlock } = this;
        const speed = 5;

        const promise = new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                if (textBlock.text.length < text.length) {
                    textBlock.text = textBlock.text + text[textBlock.text.length];
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, speed);
        });
        return from(promise);
    };
}
