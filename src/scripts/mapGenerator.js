import {log} from "../loggers/InternalLogger";

const seedrandom = require('seedrandom');
let rng = seedrandom();

const randomFromInterval = (min, max) => {
    // 'min' and 'max' are included
    return rng() * (max - min + 1) + min;
}

const generateMap = (config) => {
    const map = [];

    if(!config.cellTypes || config.cellTypes.length <= 0)
        return map;

    if(config.seed){
        rng  = seedrandom(config.seed);
    }

    log(`Creating ${config.xCount}x${config.yCount} room...`);

    for (let x = 0; x < config.xCount; x++){
        map.push([]);
        for (let y = 0; y < config.yCount; y++) {
            let cellRng = randomFromInterval(0,100);
            map[x].push(cellRng < config.fill);
        }
    }

    log(`Room created...!`);
    return map;
}

const selectCell = (solidCellArray , cellSelector) => {
    if(solidCellArray.length === 1)
        return solidCellArray[0];
    for (let i = 0; i < solidCellArray.length; i++) {

    }
}

export default generateMap