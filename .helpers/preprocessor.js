import { readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';

const lowPoly = () => {
    const newDirectory = './src/assets';
    const newFile = `${newDirectory}/low-poly.ts`;
    const assetDirectory = 'objects/gltf/';
    const values = [];
    readdirSync('./public/' + assetDirectory)
        .filter((assetFile) => assetFile.includes('.gltf'))
        .forEach((assetFile) => {
            values.push({
                variable: assetFile.replace('.gltf', '').toUpperCase(),
                file: assetFile,
                directory: assetDirectory,
            });
        });
    if (!existsSync(newDirectory)) {
        mkdirSync(newDirectory);
    }
    let lowPolyAssets = "import { Asset } from '../managers/entity-manager.js';\n\n";
    lowPolyAssets += values.map(
        ({ variable, file, directory }) => `export const ${variable}: Asset = { file: '${file}', directory: '${directory}' };\n`,
    );
    const lowPolyType = values.map(({ file, directory }) => `{ file: '${file}'; directory: '${directory}' }`).join(' | ');
    lowPolyAssets += `\nexport type LowPolyAsset = ${lowPolyType};\n`;
    writeFileSync(newFile, lowPolyAssets);
};

lowPoly();
