import { Engine, Scene, Nullable, EngineOptions, SceneOptions } from '@babylonjs/core';
import React, { useEffect, useRef, useState } from 'react';

export type BabylonjsProps = {
    antialias?: boolean;
    engineOptions?: EngineOptions;
    adaptToDeviceRatio?: boolean;
    sceneOptions?: SceneOptions;
    onSceneReady: (scene: Scene) => void;
    onRender?: (scene: Scene) => void;
    id: string;
    className?: string;
};

function SceneComponent(props: BabylonjsProps): JSX.Element {
    const reactCanvas = useRef<Nullable<HTMLCanvasElement>>(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;

    const [loaded, setLoaded] = useState(false);
    const [scene, setScene] = useState<Nullable<Scene>>(null);

    useEffect(() => {
        if (window) {
            const resize = () => {
                if (scene) {
                    scene!.getEngine().resize();
                }
            };
            window.addEventListener('resize', resize);

            return () => {
                window.removeEventListener('resize', resize);
            };
        }
    }, [scene]);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new Scene(engine, sceneOptions);
            setScene(scene);
            if (scene.isReady()) {
                props.onSceneReady(scene);
            } else {
                scene.onReadyObservable.addOnce((scene: Scene) => props.onSceneReady(scene));
            }

            engine.runRenderLoop(() => {
                if (typeof onRender === 'function') {
                    onRender(scene);
                }
                scene.render();
            });
        }

        return () => {
            if (scene !== null) {
                scene.dispose();
            }
        };
    }, [reactCanvas, onRender, props, scene, sceneOptions, engineOptions, antialias, adaptToDeviceRatio, loaded]);

    return <canvas ref={reactCanvas} {...rest} />;
}

export default SceneComponent;
