import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { Color4, Vector3 } from '@babylonjs/core/Maths/math';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { ParticleSystem } from '@babylonjs/core/Particles/particleSystem';
import { Scene } from '@babylonjs/core/scene';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Button } from '@babylonjs/gui/2D/controls/button';
import { Control } from '@babylonjs/gui/2D/controls/control';
import { StackPanel } from '@babylonjs/gui/2D/controls/stackPanel';
import { MeshButton3D } from '@babylonjs/gui/3D/controls/meshButton3D';
import { SpherePanel } from '@babylonjs/gui/3D/controls/spherePanel';
import { GUI3DManager } from '@babylonjs/gui/3D/gui3DManager';
import React, { Component } from 'react';
import { SceneManager } from '../../services/SceneManager';
import StarTexture from '../../textures/Star.png';
import createHologramMaterial from './HologramMaterial';
import SceneComponent from './SceneComponent';

type Props = { id: string; className?: string };
type State = { hasError: boolean };

class SpaceScene extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
        this.onSceneReady = this.onSceneReady.bind(this);
    }

    static getDerivedStateFromError(error: any): State {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any): void {
        console.error(error);
        console.error(errorInfo);
    }

    render(): JSX.Element {
        const { id, className } = this.props;
        const { hasError } = this.state;
        if (hasError) return <span>Uh oh! An error has occured!</span>;
        return <SceneComponent id={id} className={className} antialias onSceneReady={this.onSceneReady} />;
    }

    private onSceneReady(scene: Scene): void {
        scene.clearColor = new Color4(0, 0, 0, 0);
        SceneManager.attachInspector(scene);

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
        const showSphereHudButton = Button.CreateSimpleButton('Sphere Hud', 'Show Sphere Hud');
        showSphereHudButton.width = '250px';
        showSphereHudButton.height = '50px';
        showSphereHudButton.color = 'cyan';
        showSphereHudButton.thickness = 1;
        showSphereHudButton.onPointerUpObservable.add(() => alert('TODO: Show Sphere Hud'));
        showSphereHudButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        stackPanel.addControl(showSphereHudButton);
        const hideSphereHudButton = Button.CreateSimpleButton('Sphere Hud', 'Hide Sphere Hud');
        hideSphereHudButton.width = '250px';
        hideSphereHudButton.height = '50px';
        hideSphereHudButton.color = 'cyan';
        hideSphereHudButton.thickness = 1;
        hideSphereHudButton.onPointerUpObservable.add(() => alert('TODO: Hide Sphere Hud'));
        hideSphereHudButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        stackPanel.addControl(hideSphereHudButton);

        // 3D Ui
        const gui3DManager = new GUI3DManager(scene);
        const spherePanel = new SpherePanel();
        spherePanel.name = 'Sphere Panel';
        spherePanel.margin = 1.14;
        gui3DManager.addControl(spherePanel);
        const sphereAnchor = new TransformNode('Sphere Panel Anchor');
        sphereAnchor.rotate(new Vector3(1, 0, 0), Math.PI / 2);
        sphereAnchor.position = new Vector3(0, 0, 5);
        spherePanel.linkToTransformNode(sphereAnchor);

        const holographicMaterial = createHologramMaterial(scene);
        spherePanel.blockLayout = true;
        for (let i = 0; i < 10; i++) {
            const mesh = Mesh.CreateIcoSphere('Sphere Button Mesh', { radius: 0.5, subdivisions: 1 }, scene);
            mesh.material = holographicMaterial;
            const button = new MeshButton3D(mesh, 'Sphere Button');
            button.onPointerClickObservable.add(() => alert('Todo: Hud Actions'));

            scene.onBeforeRenderObservable.add(() => {
                const rotation = (2 * Math.PI) / 60;
                mesh.rotation.y += rotation / 12;
                mesh.rotation.x += rotation / 24;
                mesh.rotation.z += rotation / 36;
            });

            spherePanel.addControl(button);
        }
        spherePanel.blockLayout = false;
    }
}

export default SpaceScene;
