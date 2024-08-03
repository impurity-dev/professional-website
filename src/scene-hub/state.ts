import * as BABYLON from '@babylonjs/core';
import * as skyboxes from '../shared/skyboxes';
import * as states from '../managers/states.js';
import * as worlds from './worlds.js';
import * as controllers from './inputs.js';
import * as guis from './guis.js';
import * as events from './events.js';
import * as sounds from './sounds.js';
import * as assets from './assets';

export class State extends states.State {
    assets = [
        assets.FIGHTER_ASSET,
        assets.PROPSBASE_ASSET,
        assets.ROOFEMPTY_ASSET,
        assets.FLOORBASIC1_ASSET,
        assets.DOORDOUBLE_WALL_SIDEA,
        assets.DOORDOUBLE_WALL_SIDEB,
        assets.DOOR_DOUBLE,
        assets.WALLPIPES_ASSET,
        assets.WALL1_ASSET,
        assets.WALL2_ASSET,
        assets.WALL3_ASSET,
        assets.WALL5_ASSET,
        assets.COLUMNSLIM_ASSET,
        assets.COLUMN1_ASSET,
        assets.COLUMN2_ASSET,
        assets.COLUMN3_ASSET,
    ];
    private isLaunchable = false;

    build = async () => {
        const { scene, assetFactory } = this;
        const event = new events.HubEvents();
        new controllers.FPSController({ scene, location: new BABYLON.Vector3(-20, 2, 1), target: new BABYLON.Vector3(2, 2, 0), event });
        new worlds.StartWorld({ assetFactory, event });
        new guis.HubGui({ scene, event });
        event.onTrigger.add(({ toggle }) => (this.isLaunchable = toggle));
        event.onAction.add(() => {
            if (!this.isLaunchable) return;
            this.gameManager.goTo({ type: 'fighter' });
        });
        sounds.trailerMusic({ scene });
        skyboxes.purpleSpace({ scene });
    };
}
