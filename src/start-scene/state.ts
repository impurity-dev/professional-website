import * as states from '../managers/states.js';
import * as cameras from './cameras.js';
import * as effects from './effects.js';
import * as events from './events.js';
import { MenuGui } from './guis.js';
import * as sounds from './sounds.js';

export class MenuState extends states.State {
    run = async (): Promise<void> => {
        const { scene, entityManager, gameManager } = this;
        const mainCamera = new cameras.MenuCamera({ scene, gameManager });
        const guiCamera = new cameras.GuiCamera({ scene });
        const event = new events.Events();
        event.onStart.add(() => gameManager.goTo({ type: 'hub' }));
        event.onClick.add(() => gameManager.goTo({ type: 'credits' }));
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
