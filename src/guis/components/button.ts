import { Button } from '@babylonjs/gui';

export default function createButton(id: string, text: string): Button {
    const button = Button.CreateSimpleButton(id, text);
    button.height = '40px';
    button.width = '100px';
    button.color = 'white';
    button.thickness = 5;
    return button;
}
