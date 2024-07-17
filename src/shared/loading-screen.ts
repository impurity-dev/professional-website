import { ILoadingScreen } from '@babylonjs/core/Loading/loadingScreen';
import * as logger from '../shared/logger';
import Lottie, { AnimationItem } from 'lottie-web';

export class LoadingScreen implements ILoadingScreen {
    public loadingUIBackgroundColor: string = '#000000';
    loadingUIText: string = 'Loading...';
    private readonly animation: AnimationItem;

    constructor(private readonly html: HTMLDivElement) {
        this.animation = Lottie.loadAnimation({
            container: html,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './loading.json',
        });
    }

    displayLoadingUI = () => {
        this.animation.play();
        logger.debug('Loading...');
        this.html.style.opacity = '1';
        this.html.style.display = 'initial';
    };

    hideLoadingUI = () => {
        logger.debug('Loaded!');
        this.html.style.opacity = '0';
        setTimeout(() => {
            this.html.style.display = 'none';
            this.animation.stop();
        }, 1_000);
    };
}
