const fs = require('fs');

export function readFile(path){
    return fs.readFileSync(path, 'utf8')
}

export function writeToFile(path, data){
    fs.writeFileSync(path, data, {encoding: 'utf-8'})
}
