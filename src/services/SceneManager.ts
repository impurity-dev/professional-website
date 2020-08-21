import { Scene } from '@babylonjs/core/scene';
import '@babylonjs/inspector';
import '@babylonjs/core/Debug/debugLayer';

export class SceneManager {
    public static attachInspector(scene: Scene): void {
        if (process.env.REACT_APP_DEBUG === 'true') {
            scene.debugLayer.show();
        }
    }
}
