import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, FreeCamera, Color4 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';

enum State {
    START = 0,
    FLYING = 1,
}

class App {
    // General Entire Application
    private _scene: Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;

    //Scene - related
    private _state: number = 0;
    private _flyingScene: Scene;

    constructor() {
        this._canvas = this._createCanvas();

        // initialize babylon scene and engine
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);

        // hide/show the Inspector
        window.addEventListener('keydown', (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (this._scene.debugLayer.isVisible()) {
                    this._scene.debugLayer.hide();
                } else {
                    this._scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        this._main();
    }

    private _createCanvas(): HTMLCanvasElement {
        //Commented out for development
        document.documentElement.style['overflow'] = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.width = '100%';
        document.documentElement.style.height = '100%';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.margin = '0';
        document.body.style.padding = '0';

        //create the canvas html element and attach it to the webpage
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.id = 'gameCanvas';
        document.body.appendChild(canvas);

        return canvas;
    }

    private async _main(): Promise<void> {
        await this._goToStart();

        // Register a render loop to repeatedly render the scene
        this._engine.runRenderLoop(() => {
            switch (this._state) {
                case State.START:
                    this._scene.render();
                    break;
                case State.FLYING:
                    this._scene.render();
                    break;
                default:
                    throw new Error(`Invalid State: ${this._state}`);
            }
        });

        // Resize if the screen is resized/rotated
        window.addEventListener('resize', () => this._engine.resize());
    }

    private async _goToStart(): Promise<void> {
        this._engine.displayLoadingUI();

        this._scene.detachControl();
        const scene = new Scene(this._engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        const camera = new FreeCamera('camera1', new Vector3(0, 0, 0), scene);
        camera.setTarget(Vector3.Zero());

        //create a fullscreen ui for all of our GUI elements
        const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        guiMenu.idealHeight = 720; //fit our fullscreen ui to this height

        //create a simple button
        const startBtn = Button.CreateSimpleButton('start', 'PLAY');
        startBtn.width = 0.2;
        startBtn.height = '40px';
        startBtn.color = 'white';
        startBtn.top = '-14px';
        startBtn.thickness = 0;
        startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        guiMenu.addControl(startBtn);

        //this handles interactions with the start button attached to the scene
        startBtn.onPointerDownObservable.add(() => {
            this._goToFlying();
            scene.detachControl(); //observables disabled
        });

        //--SCENE FINISHED LOADING--
        await scene.whenReadyAsync();
        this._engine.hideLoadingUI();
        //lastly set the current state to the start state and set the scene to the start scene
        this._scene.dispose();
        this._scene = scene;
        this._state = State.START;
    }

    private async _goToFlying(): Promise<void> {
        //--SETUP SCENE--
        this._scene.detachControl();
        this._flyingScene = new Scene(this._engine);
        const scene: Scene = this._flyingScene;
        console.log(!!scene);
        scene.clearColor = new Color4(0.01568627450980392, 0.01568627450980392, 0.20392156862745098); // a color that fit the overall color scheme better
        const camera: ArcRotateCamera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.setTarget(Vector3.Zero());

        //--GUI--
        const playerUI = AdvancedDynamicTexture.CreateFullscreenUI('UI');
        //dont detect any inputs from this ui while the game is loading
        scene.detachControl();

        //create a simple button
        const exitBtn = Button.CreateSimpleButton('exit', 'EXIT');
        exitBtn.width = 0.2;
        exitBtn.height = '40px';
        exitBtn.color = 'white';
        exitBtn.top = '-14px';
        exitBtn.thickness = 0;
        exitBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        playerUI.addControl(exitBtn);

        //this handles interactions with the start button attached to the scene
        exitBtn.onPointerDownObservable.add(() => {
            this._goToStart();
            scene.detachControl(); //observables disabled
        });

        //temporary scene objects
        const light1: HemisphericLight = new HemisphericLight('light1', new Vector3(1, 1, 0), scene);
        const sphere: Mesh = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);

        //--WHEN SCENE FINISHED LOADING--
        await scene.whenReadyAsync();
        //get rid of start scene, switch to gamescene and change states
        this._scene.dispose();
        this._state = State.FLYING;
        this._scene = scene;
        this._engine.hideLoadingUI();
        //the game is ready, attach control back
        this._scene.attachControl();
    }
}
new App();
