const fs = require('fs');
const util = require('util');

const _ = require('lodash');

async function transformFile(inFile, outFile) {
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);

    console.log(`Leyendo archivo: ${inFile}`);
    const data = await readFile(`${__dirname}/${inFile}`, 'utf-8');
    let names = data.split('\n');

    names = names.map(_.startCase).sort();
    console.log(`Escribiendo archivo: ${outFile}`);

    await writeFile(`${__dirname}/${outFile}`, names.join('\n'));
    console.log('Programa terminado');
    return;
}

transformFile('entrada.txt', 'salida.txt');
