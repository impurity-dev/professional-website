import { PluginOption, defineConfig } from 'vite';

export default defineConfig(({ command }) => {
    const base = command === 'build' ? '/professional-website/' : '/';
    return {
        base,
        plugins: [ShaderHmr()],
    };
});

const ShaderHmr = (): PluginOption => {
    return {
        name: 'custom-hmr',
        enforce: 'post',
        handleHotUpdate({ file, server }) {
            if (file.endsWith('.fx')) {
                console.log('reloading shader file...');
                server.ws.send({
                    type: 'full-reload',
                    path: '*',
                });
            }
        },
    };
};
