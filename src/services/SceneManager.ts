import { Scene } from '@babylonjs/core/scene';
import '@babylonjs/core/XR/features/WebXRControllerTeleportation'; // NOTE: This enables 3d mouse events

export class SceneManager {
    public static attachInspector(scene: Scene): void {
        if (process.env.REACT_APP_DEBUG === 'true') {
            import('@babylonjs/inspector')
                .then(() =>
                    import('@babylonjs/core/Debug/debugLayer')
                        .then(() => (scene as any).debugLayer.show())
                        .catch((e) => console.error(`Could not load debug layer: ${e}`)),
                )
                .catch((e) => console.error(`Could not load inspector: ${e}`));
        }
    }
}
