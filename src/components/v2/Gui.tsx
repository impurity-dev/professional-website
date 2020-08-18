import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Color3, Color4, Vector3 } from '@babylonjs/core/Maths/math';
import { Scene } from '@babylonjs/core/scene';
import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import React, { useEffect } from 'react';

type GuiProps = { id: string; className?: string };

function Gui({ id, className = '' }: GuiProps): JSX.Element {
    useEffect(() => {
        createCockpit(id);
    });
    return <canvas id={id} className={className} />;
}

function createCockpit(id: string): Scene {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const engine = new Engine(canvas);

    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);

    const camera = new FreeCamera('Camera', new Vector3(0, 0, -11), scene);
    camera.setTarget(Vector3.Zero());

    const material = new GridMaterial('Grid', scene);
    material.lineColor = new Color3(1, 0, 1);
    material.mainColor = new Color3(0, 0, 0);

    // GUI
    const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);

    const rect1 = new Rectangle();
    advancedTexture.addControl(rect1);

    const text1 = new TextBlock();
    text1.text = 'Tyler Kokoszka\nSoftware Engineer';
    text1.color = 'white';
    text1.fontSize = 50;
    rect1.addControl(text1);

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });

    return scene;
}

export default Gui;
