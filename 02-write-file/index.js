const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const output = fs.createWriteStream(path.join(__dirname, 'output.txt'));
stdout.write('Hi, type your text here:');
stdin.on('data', chunk => {
    output.write(chunk);
    if(chunk.toString().includes('exit')) process.exit();
});
process.on('exit', () => console.log('Good bye!'));