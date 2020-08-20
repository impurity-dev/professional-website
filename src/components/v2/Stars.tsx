import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Color4, Vector3 } from '@babylonjs/core/Maths/math';
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import '@babylonjs/core/Meshes/meshBuilder';
import { ParticleSystem } from '@babylonjs/core/Particles/particleSystem';
import { Scene } from '@babylonjs/core/scene';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Button } from '@babylonjs/gui/2D/controls/button';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { StackPanel } from '@babylonjs/gui/2D/controls/stackPanel';
import { HolographicButton } from '@babylonjs/gui/3D/controls/holographicButton';
import { SpherePanel } from '@babylonjs/gui/3D/controls/spherePanel';
import { GUI3DManager } from '@babylonjs/gui/3D/gui3DManager';
import React, { Component } from 'react';
import StarTexture from '../../textures/Star.png';
import createHologramMaterial from './HologramMaterial';
import './Stars.scss';
import { Button3D } from '@babylonjs/gui/3D/controls/button3D';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';

type Props = { id: string; className?: string };
type State = { isHyperspeed: boolean; starParticleSystem: ParticleSystem };

class Stars extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.createScene = this.createScene.bind(this);
    }

    componentDidMount(): void {
        this.createScene();
    }

    render(): JSX.Element {
        const { id, className } = this.props;
        return <canvas id={id} className={className} />;
    }

    private createScene(): void {
        const { id } = this.props;
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        const engine = new Engine(canvas);

        const scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 0);

        const camera = new FreeCamera('Camera', new Vector3(0, 0, -10), scene);
        camera.setTarget(Vector3.Zero());

        // Stars
        const starParticleSystem = new ParticleSystem('Particles', 20_000, scene);
        starParticleSystem.particleTexture = new Texture(StarTexture, scene);

        starParticleSystem.minAngularSpeed = -0.5;
        starParticleSystem.maxAngularSpeed = 0.5;
        starParticleSystem.minSize = 0.005;
        starParticleSystem.maxSize = 0.01;
        starParticleSystem.minLifeTime = 5;
        starParticleSystem.maxLifeTime = 6;
        starParticleSystem.createPointEmitter(new Vector3(1, 1, 1), new Vector3(-1, -1, -1));
        starParticleSystem.minEmitPower = 0.5;
        starParticleSystem.maxEmitPower = 4;
        starParticleSystem.emitRate = 400;
        starParticleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;
        starParticleSystem.color1 = new Color4(1, 1, 1);
        starParticleSystem.color2 = new Color4(1, 1, 1);
        starParticleSystem.preWarmCycles = 100;
        starParticleSystem.preWarmStepOffset = 5;
        starParticleSystem.start();

        // 2D Ui
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
            starParticleSystem.minAngularSpeed = -1;
            starParticleSystem.maxAngularSpeed = 1;
            starParticleSystem.minEmitPower = 10;
            starParticleSystem.maxEmitPower = 100;
            starParticleSystem.minSize = 0.01;
            starParticleSystem.maxSize = 0.02;
            starParticleSystem.emitRate = 2000;
            starParticleSystem.reset();
        });
        hyperSpeedButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        stackPanel.addControl(hyperSpeedButton);
        const diftingSpeedButton = Button.CreateSimpleButton('HyperSpeed Button', 'Difting Speed');
        diftingSpeedButton.width = '250px';
        diftingSpeedButton.height = '50px';
        diftingSpeedButton.color = 'cyan';
        diftingSpeedButton.thickness = 1;
        diftingSpeedButton.background = 'red';
        diftingSpeedButton.onPointerUpObservable.add(() => {
            starParticleSystem.minAngularSpeed = -0.5;
            starParticleSystem.maxAngularSpeed = 0.5;
            starParticleSystem.minEmitPower = 0.5;
            starParticleSystem.maxEmitPower = 4;
            starParticleSystem.minSize = 0.005;
            starParticleSystem.maxSize = 0.01;
            starParticleSystem.emitRate = 400;
        });
        diftingSpeedButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        stackPanel.addControl(diftingSpeedButton);
        const showSphereHudButton = Button.CreateSimpleButton('Sphere Hud', 'Show Hud');
        showSphereHudButton.width = '250px';
        showSphereHudButton.height = '50px';
        showSphereHudButton.color = 'cyan';
        showSphereHudButton.thickness = 1;
        showSphereHudButton.background = 'blue';
        showSphereHudButton.onPointerUpObservable.add(() => alert('TODO: Show Shere Hud'));
        showSphereHudButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        stackPanel.addControl(showSphereHudButton);

        // 3D Ui
        const gui3DManager = new GUI3DManager(scene);
        const spherePanel = new SpherePanel();
        spherePanel.margin = 0.2;
        gui3DManager.addControl(spherePanel);

        for (let i = 0; i < 10; i++) {
            const button = new Button3D('orientation');
            button.content = new TextBlock('Button #' + i, 'Button #' + i);
            button.onPointerClickObservable.add(() => alert('hello'));
            spherePanel.addControl(button);
        }

        engine.runRenderLoop(() => scene.render());
        window.addEventListener('resize', () => engine.resize());
    }
}

export default Stars;
