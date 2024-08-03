import * as states from '../managers/states.js';
import * as cameras from './cameras.js';
import * as effects from './effects.js';
import * as events from './events.js';
import * as guis from './guis.js';
import * as sounds from './sounds.js';

export class State extends states.State {
    assets = [];

    build = async () => {
        const { scene, gameManager } = this;
        const mainCamera = new cameras.MenuCamera({ scene, gameManager });
        const guiCamera = new cameras.GuiCamera({ scene });
        const event = new events.Events();
        event.onStart.add(() => gameManager.goTo({ type: 'launch' }));
        event.onCredits.add(() => gameManager.goTo({ type: 'credits' }));
        effects.mandelbulb({ scene, camera: mainCamera.camera });
        sounds.sounds({ scene, event });
        new guis.MenuGui({
            scene,
            mask: guiCamera.mask,
            event,
        });
    };
}
