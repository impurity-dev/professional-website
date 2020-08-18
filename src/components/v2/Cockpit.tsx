import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Color4, Vector3, Color3 } from '@babylonjs/core/Maths/math';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { Scene } from '@babylonjs/core/scene';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { Button3D } from '@babylonjs/gui/3D/controls/button3D';
import { Container3D } from '@babylonjs/gui/3D/controls/container3D';
import { StackPanel3D } from '@babylonjs/gui/3D/controls/stackPanel3D';
import { GUI3DManager } from '@babylonjs/gui/3D/gui3DManager';
import React, { useEffect } from 'react';

type CockpitProps = { id: string; className?: string };

function Cockpit({ id, className = '' }: CockpitProps): JSX.Element {
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

    const camera = new FreeCamera('Camera', new Vector3(0, -4, -10), scene);
    camera.setTarget(Vector3.Zero());

    const anchor = new TransformNode('');
    const gui3DManager = new GUI3DManager(scene);
    const stackPanel3D = new StackPanel3D();
    stackPanel3D.margin = 0.5;
    gui3DManager.addControl(stackPanel3D);
    for (let i = 0; i < 3; i++) {
        const button = new Button3D('Experience');
        const text = new TextBlock();
        text.text = 'Go';
        text.color = 'white';
        text.fontSize = 24;
        button.content = text;
        stackPanel3D.addControl(button);
    }
    stackPanel3D.linkToTransformNode(anchor);
    stackPanel3D.position.y -= 3.5;

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });

    return scene;
}

export default Cockpit;
