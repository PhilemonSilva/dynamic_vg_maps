import {log} from "../loggers/InternalLogger";

const seedrandom = require('seedrandom');
let rng = seedrandom();

const randomFromInterval = (min, max) => {
    // The 'min' and 'max' values are included
    return rng() * (max - min + 1) + min;
}

const generateMap = (config) => {
    if (!config.cellTypes || config.cellTypes.length <= 0)
        return [];
    if (config.seed) {
        rng = seedrandom(config.seed);
    }
    log(`Creating ${config.xCount}x${config.yCount} room...`);
    let map = generateRandomRoom(config);
    for (let i = 0; i < 5; i++) {
        map = smooth(map);
    }
    log(`Room created...!`);
    return map;
}

const generateRandomRoom = (config) => {
    const map = [];
    for (let x = 0; x < config.xCount; x++) {
        map.push([]);
        for (let y = 0; y < config.yCount; y++) {
            if (x === 0 || x === config.xCount - 1 || y === 0 || y === config.yCount - 1) {
                map[x].push(true);
                continue;
            }
            let cellRng = randomFromInterval(0, 100);
            map[x].push(cellRng < config.fill);
        }
    }
    return map;
}

const smooth = (map) => {
    let smoothMap = map
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            let solidCellCount = getSurroundingSolidCellCount(map, x, y);
            if (solidCellCount > 4)
                smoothMap[x][y] = true;
            else if (solidCellCount < 4)
                smoothMap[x][y] = false;
        }
    }
    return smoothMap;
}

const getSurroundingSolidCellCount = (map, x, y) => {
    let solidCellCount = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i < 0 || i >= map.length || j < 0 || j >= map[i].length) {
                continue;
            }
            if (map[i][j]) {
                solidCellCount++;
            }
        }
    }
    return solidCellCount;
}

const selectCell = (solidCellArray, cellSelector) => {
    if (solidCellArray.length === 1)
        return solidCellArray[0];
    for (let i = 0; i < solidCellArray.length; i++) {

    }
}

export default generateMap