import { ILoadingScreen } from '@babylonjs/core/Loading/loadingScreen';
import * as logger from '../shared/logger';
import Lottie, { AnimationItem } from 'lottie-web';

export class LoadingScreen implements ILoadingScreen {
    public loadingUIBackgroundColor: string = '#000000';

    private readonly animation: AnimationItem;
    private readonly textNode: HTMLElement;

    constructor(private readonly html: HTMLDivElement) {
        this.textNode = document.getElementById('loading-text');
        this.animation = Lottie.loadAnimation({
            container: document.getElementById('loading-loader'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './loading.json',
        });
    }

    get loadingUIText() {
        return this.textNode.textContent;
    }

    set loadingUIText(text: string) {
        this.textNode.textContent = text;
    }

    displayLoadingUI = () => {
        this.animation.play();
        logger.debug('Loading...');
        this.loadingUIText = 'Loading...';
        this.html.style.opacity = '1';
        this.html.style.display = 'flex';
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
