import { Mesh } from '@babylonjs/core';
import { AdvancedDynamicTexture, Line, Rectangle, TextBlock } from '@babylonjs/gui';

export function createMapPlanetLabel(text: string, target: Mesh, gui: AdvancedDynamicTexture): void {
    const rect = new Rectangle();
    rect.height = '40px';
    rect.width = '100px';
    rect.color = 'white';
    rect.thickness = 1;
    rect.background = 'transparent';
    gui.addControl(rect);
    rect.linkWithMesh(target);
    rect.linkOffsetY = -150;

    const label = new TextBlock();
    label.text = text;
    rect.addControl(label);

    const line = new Line();
    line.lineWidth = 4;
    line.color = 'white';
    line.y2 = 20;
    line.linkOffsetY = -40;
    gui.addControl(line);
    line.linkWithMesh(target);
    line.connectedControl = rect;
}
