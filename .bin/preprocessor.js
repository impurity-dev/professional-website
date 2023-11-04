import { readdirSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'fs';

const assetDestination = './src/assets';

const clear = () => {
    readdirSync(assetDestination).forEach((assetFile) => unlinkSync(`${assetDestination}/${assetFile}`));
};

const buildEnvironmentAssets = ({ fileName, typeName }) => {
    const newDirectory = './src/assets';
    const newFile = `${newDirectory}/${fileName}.ts`;
    const assetDirectory = 'assets/environment/';
    const values = [];
    readdirSync('./public/' + assetDirectory, { recursive: true })
        .filter((assetFile) => assetFile.includes('.gltf'))
        .forEach((assetFile) => {
            const [dir, file] = assetFile.split('\\');
            values.push({
                variable: assetFile.replace('.gltf', '').replace('\\', '__').toUpperCase(),
                file: file || assetFile,
                directory: assetDirectory + dir,
            });
        });
    if (!existsSync(newDirectory)) {
        mkdirSync(newDirectory);
    }
    let assets = "import { Asset } from '../managers/entity-manager.js';\n\n";
    assets += values
        .map(({ variable, file, directory }) => `export const ${variable}: Asset = { file: '${file}', directory: '${directory}' };`)
        .join('\n');
    const types = values.map(({ file, directory }) => `{ file: '${file}'; directory: '${directory}' }`).join(' | ');
    assets += `\n\nexport type ${typeName} = ${types};\n`;
    writeFileSync(newFile, assets);
};

clear();
buildEnvironmentAssets({
    fileName: 'environment',
    typeName: 'EnvironmentAsset',
});
