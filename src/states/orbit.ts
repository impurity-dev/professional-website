import State from '../game/state';
import Travel from './travel';

export default class Orbit extends State {
    async run(): Promise<void> {}

    goToTravel(): void {
        this.gameManager.setState(new Travel(this.gameManager));
    }
}
