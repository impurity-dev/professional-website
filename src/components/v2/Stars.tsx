import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Color4, Vector3 } from '@babylonjs/core/Maths/math';
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import '@babylonjs/core/Meshes/meshBuilder';
import { ParticleSystem } from '@babylonjs/core/Particles/particleSystem';
import { Scene } from '@babylonjs/core/scene';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle';
import { StackPanel } from '@babylonjs/gui/2D/controls/stackPanel';
import { Button } from '@babylonjs/gui/2D/controls/button';
import React, { Component } from 'react';
import StarTexture from '../../textures/Star.png';
import './Stars.scss';

type Props = { id: string; className?: string };
type State = { isHyperspeed: boolean; starParticleSystem: ParticleSystem };

class Stars extends Component<Props, State> {
    componentDidMount(): void {
        const { id } = this.props;
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        const engine = new Engine(canvas);

        const scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 0);

        const camera = new FreeCamera('Camera', new Vector3(0, 0, -10), scene);
        camera.setTarget(Vector3.Zero());

        const starParticleSystem = new ParticleSystem('Particles', 20_000, scene);
        starParticleSystem.particleTexture = new Texture(StarTexture, scene);

        starParticleSystem.minAngularSpeed = -0.5;
        starParticleSystem.maxAngularSpeed = 0.5;
        starParticleSystem.minSize = 0.005;
        starParticleSystem.maxSize = 0.01;
        starParticleSystem.minLifeTime = 5;
        starParticleSystem.maxLifeTime = 6;
        starParticleSystem.createBoxEmitter(new Vector3(1, 1, 1), new Vector3(-1, -1, -1), new Vector3(0, 0, 0), new Vector3(0, 0, 0));
        starParticleSystem.minEmitPower = 0.5;
        starParticleSystem.maxEmitPower = 4;
        starParticleSystem.emitRate = 400;
        starParticleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
        starParticleSystem.color1 = new Color4(1, 1, 1);
        starParticleSystem.color2 = new Color4(1, 1, 1);
        starParticleSystem.preWarmCycles = 100;
        starParticleSystem.preWarmStepOffset = 5;
        starParticleSystem.start();

        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('Cockpit Ui', true, scene);
        const stackPanel = new StackPanel('Left Side Ui');
        stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        stackPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(stackPanel);

        const hyperSpeedButton = Button.CreateSimpleButton('HyperSpeed Button', 'Hyper Speed');
        hyperSpeedButton.width = '250px';
        hyperSpeedButton.height = '50px';
        hyperSpeedButton.color = 'cyan';
        hyperSpeedButton.thickness = 1;
        hyperSpeedButton.background = 'green';
        hyperSpeedButton.onPointerUpObservable.add(() => {
            console.log('THERE');
            starParticleSystem.minEmitPower = 10;
            starParticleSystem.maxEmitPower = 400;
            starParticleSystem.minSize = 0.01;
            starParticleSystem.maxSize = 0.02;
            starParticleSystem.emitRate = 4000;
        });
        hyperSpeedButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        const diftingSpeedButton = Button.CreateSimpleButton('HyperSpeed Button', 'Difting Speed');
        diftingSpeedButton.width = '250px';
        diftingSpeedButton.height = '50px';
        diftingSpeedButton.color = 'cyan';
        diftingSpeedButton.thickness = 1;
        diftingSpeedButton.background = 'red';
        diftingSpeedButton.onPointerUpObservable.add(() => {
            console.log('YOYOYOYO');
            starParticleSystem.minEmitPower = 0.5;
            starParticleSystem.maxEmitPower = 4;
            starParticleSystem.minSize = 0.005;
            starParticleSystem.maxSize = 0.01;
            starParticleSystem.emitRate = 400;
        });
        diftingSpeedButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        stackPanel.addControl(hyperSpeedButton);
        stackPanel.addControl(diftingSpeedButton);

        engine.runRenderLoop(() => scene.render());
        window.addEventListener('resize', () => engine.resize());
    }

    render(): JSX.Element {
        const { id, className } = this.props;
        return <canvas id={id} className={className} />;
    }
}

export default Stars;
