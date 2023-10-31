import { readdirSync, writeFileSync } from 'fs';

const lowPoly = () => {
    const files = readdirSync('./public/objects/low-poly');
    let preprocess = {};
    files
        .filter((file) => file.includes('.obj'))
        .forEach((file) => {
            preprocess[file.replace('.obj', '')] = {
                fileName: file,
                directory: 'objects/low-poly/',
            };
        });
    writeFileSync('./public/objects/low-poly/_lookup.json', JSON.stringify(preprocess));
};

lowPoly();
