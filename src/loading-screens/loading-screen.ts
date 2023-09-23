import { ILoadingScreen } from '@babylonjs/core/Loading/loadingScreen';

export class LoadingScreen implements ILoadingScreen {
    public loadingUIBackgroundColor: string = '#000000';
    loadingUIText: string = 'Loading...';

    constructor(private readonly html: HTMLDivElement) {}

    displayLoadingUI = () => {
        console.debug('Loading...');
        this.html.style.opacity = '1';
        this.html.style.display = 'block';
    };

    hideLoadingUI = () => {
        console.debug('Loaded!');
        this.html.style.opacity = '0';
        setTimeout(() => (this.html.style.display = 'none'), 1_000);
    };
}