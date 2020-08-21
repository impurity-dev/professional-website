import { Scene } from '@babylonjs/core/scene';

export class SceneManager {
    static get isDebug(): boolean {
        return !!process.env.REACT_APP_DEBUG;
    }

    public static attachInspector(scene: Scene): void {
        if (SceneManager.isDebug) {
            require('@babylonjs/core/Debug/debugLayer');
            require('@babylonjs/inspector');
            (scene as any).debugLayer.show();
        }
    }
}
