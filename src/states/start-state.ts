import { ArcRotateCamera, HemisphericLight, Vector3 } from '@babylonjs/core';
import { SpaceSkybox } from '../skyboxes/space-skybox.js';
import { State } from './state.js';
import { IntroSound } from '../sounds/intro-sound.js';
import { RobotEntity } from '../entities/robot-entity.js';

export class StartState extends State {
    private sound: IntroSound;
    private camera: ArcRotateCamera;

    run = async (): Promise<void> => {
        const robot = new RobotEntity(this.scene);
        robot.position = Vector3.Zero();
        robot.rotate(new Vector3(1, 1, 0), 1);
        robot.scaling = new Vector3(1, 1, 1);

        this.camera = new ArcRotateCamera('ArcFollowCamera', 0, Math.PI / 2.5, 100, robot.position.add(new Vector3(10, 10, 0)), this.scene);
        this.scene.activeCamera = this.camera;

        this.sound = new IntroSound(this.scene);

        new HemisphericLight('light1', new Vector3(1, 1, 0), this.scene);
        new SpaceSkybox(this.scene);
    };
}
