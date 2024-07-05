import { State } from '../states/state.js';
import { MenuGui } from './guis.js';
import * as cameras from './cameras.js';
import * as sounds from './sounds.js';
import * as effects from './effects.js';

export class MenuState extends State {
    run = async (): Promise<void> => {
        const { scene, entityManager, gameManager } = this;
        const mainCamera = new cameras.MenuCamera({ scene, gameManager });
        const guiCamera = new cameras.GuiCamera({ scene });

        effects.mandelbulb({ scene, camera: mainCamera.camera });
        const sound = new sounds.Sounds({ scene });
        await entityManager.load();
        new MenuGui({
            scene,
            sound,
            mask: guiCamera.mask,
            onStart: () => this.gameManager.goTo({ type: 'start' }),
        });
    };
}
