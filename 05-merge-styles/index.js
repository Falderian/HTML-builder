const fs = require('fs');
const path = require('path');

const pathToStylesFolder = path.join(__dirname, 'styles');
const pathToProjectDistFodler = path.join(__dirname, 'project-dist');
const pathToBundleCss = path.join(pathToProjectDistFodler, 'bundle.css');

fs.open(path.join(pathToProjectDistFodler, 'bundle.css'), 'w', (err) => {
    if(err) throw err;
});

fs.readdir(pathToStylesFolder, (err, files) => {
    if(err) throw err;
    files.forEach(item => {
        fs.stat(path.join(pathToStylesFolder, item), (err, stat) => {
            if(err) console.log(error);
            if(path.parse(item).ext.slice(1) === 'css') {
                const readableStream = fs.createReadStream(path.join(pathToStylesFolder, item), 'utf-8');
                readableStream.on('data', chunk => {
                    fs.appendFile(pathToBundleCss, chunk, (err) => {
                        if (err) {console.log(err);}
                    });
                });
            }
        });
    }); 
});