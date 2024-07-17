import * as states from '../managers/states.js';

export class LaunchState extends states.State {
    async run(): Promise<void> {
        await this.entityManager.load();
    }
}
