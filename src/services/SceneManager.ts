import { Scene } from '@babylonjs/core/scene';
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';

export class SceneManager {
    static get isDebug(): boolean {
        return !!process.env.REACT_APP_DEBUG;
    }

    public static attachInspector(scene: Scene): void {
        if (SceneManager.isDebug) {
            scene.debugLayer.show();
        }
    }
}
