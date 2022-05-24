const fs = require('fs');
const path = require('path');

const pathToFilesFolder = path.join(__dirname, 'files');
const pathToFilesCopyFolder = path.join(__dirname, 'files-copy');

function copyDir() {    
    
    fs.readdir(pathToFilesCopyFolder , (err, files) => {
        if(err) throw err;
        files.forEach(item => {
            fs.unlink(path.join(pathToFilesCopyFolder,item) , (err) => {
                if (err) {console.log()};
            })
        });
    })
     
    fs.mkdir(pathToFilesCopyFolder, { recursive: true }, err => {if(err) return;});
    fs.readdir(pathToFilesFolder , (err, files) => {
        if(err) throw err;
        files.forEach(item => {        
            fs.stat(path.join(__dirname,'files', item), (err, stat) => {
                if (err) {console.log(err);}
                if(stat.isDirectory(item)) return;
            });
            fs.copyFile(path.join(pathToFilesFolder, item), path.join(pathToFilesCopyFolder, item), (err) => {
                if (err) throw err;
            });         
        })
    });
}

copyDir();

