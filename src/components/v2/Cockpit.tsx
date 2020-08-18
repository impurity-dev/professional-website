import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Texture } from '@babylonjs/core/Materials/Textures/';
import { Color3, Color4, Vector2, Vector3 } from '@babylonjs/core/Maths/math';
import { PolygonMeshBuilder } from '@babylonjs/core/Meshes/polygonMesh';
import { Scene } from '@babylonjs/core/scene';
import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial';
import React, { useEffect } from 'react';
import SpaceMetalTexture from '../../textures/SpaceMetal.jpg';

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
    scene.clearColor = new Color4(1, 0, 0, 0);

    const camera = new FreeCamera('Camera', new Vector3(0, 0, -10), scene);
    camera.setTarget(Vector3.Zero());

    const material = new GridMaterial('Grid', scene);
    material.lineColor = new Color3(1, 1, 0);
    material.mainColor = new Color3(0, 0, 1);
    const metalMaterial = new StandardMaterial('Metal', scene);
    metalMaterial.ambientTexture = new Texture(SpaceMetalTexture, scene);
    metalMaterial.diffuseTexture = new Texture(SpaceMetalTexture, scene);
    metalMaterial.emissiveTexture = new Texture(SpaceMetalTexture, scene);

    const cornersTop: Array<Vector2> = [new Vector2(-8, -8), new Vector2(-2, 0), new Vector2(2, 0), new Vector2(8, -8)];
    const polygonMeshTop = new PolygonMeshBuilder('PolygonMeshTop', cornersTop, scene);
    const polygonTop = polygonMeshTop.build(false, 1);
    polygonTop.position.y += 3;
    polygonTop.material = metalMaterial;

    const cornersBottom: Array<Vector2> = [new Vector2(-8, -8), new Vector2(-2, 0), new Vector2(2, 0), new Vector2(8, -8)];
    const polygonMeshBottom = new PolygonMeshBuilder('PolygonMeshBottom', cornersBottom, scene);
    const polygonBottom = polygonMeshBottom.build(false, 1);
    polygonBottom.position.y -= 2.75;
    polygonBottom.material = metalMaterial;

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });

    return scene;
}

export default Cockpit;
