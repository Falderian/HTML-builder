const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
   if(err) throw err;
   files.forEach(item => {        
        fs.stat(path.join(__dirname, 'secret-folder', item), (error, stat) => {
            if(stat.isDirectory(item)) return;
            console.log(path.parse(item).name + ' ' + '-' + ' ' + path.parse(item).ext.slice(1) + ' ' + '-' + ' ' + (stat.size*0.001)+'kb');
        });            
   })
});