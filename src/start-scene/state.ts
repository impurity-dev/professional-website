import { State } from '../shared/state.js';
import { MenuGui } from './guis.js';
import * as cameras from './cameras.js';
import * as sounds from './sounds.js';
import * as effects from './effects.js';
import * as events from './events.js';

export class MenuState extends State {
    run = async (): Promise<void> => {
        const { scene, entityManager, gameManager } = this;
        const mainCamera = new cameras.MenuCamera({ scene, gameManager });
        const guiCamera = new cameras.GuiCamera({ scene });
        const event = new events.Events();
        event.onStart.add(() => gameManager.goTo({ type: 'start' }));
        effects.mandelbulb({ scene, camera: mainCamera.camera });
        sounds.sounds({ scene, event });
        await entityManager.load();
        new MenuGui({
            scene,
            mask: guiCamera.mask,
            event,
        });
    };
}
