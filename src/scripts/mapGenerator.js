import {log} from "../loggers/InternalLogger";
import Directions from '../util/directionEnum'
import _ from 'lodash'

const seedrandom = require('seedrandom');
let rng = seedrandom();

const randomFromInterval = (min, max) => {
    // The 'min' and 'max' values are included
    return rng() * (max - min + 1) + min;
}

const generateMap = (config) => {
    let openings = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT];

    if (!config.cellTypes || config.cellTypes.length <= 0)
        return [];
    if (config.seed) {
        rng = seedrandom(config.seed);
    }
    log(`Creating ${config.xCount}x${config.yCount} room...`);
    let room = generateRandomRoom(config);

    room = createPaths(room, config.pathWidth, openings);

    for (let i = 0; i < 5; i++) {
        room = smooth(room);
    }
    room = fillRoomWithCells(room, config);
    log(`Room created...!`);
    return room;
}

const generateRandomRoom = (config) => {
    const map = [];
    for (let x = 0; x < config.xCount; x++) {
        map.push([]);
        for (let y = 0; y < config.yCount; y++) {
            if (isOuterRoomWall(x, y, config.xCount, config.yCount, config.roomWallMinimumWidth)) {
                map[x].push(true);
                continue;
            }
            let cellRng = randomFromInterval(0, 100);
            map[x].push(cellRng < config.fill);
        }
    }
    return map;
}

const smooth = (room) => {
    let smoothMap = room
    for (let x = 0; x < room.length; x++) {
        for (let y = 0; y < room[x].length; y++) {
            let solidCellCount = getSurroundingSolidCellCount(room, x, y);
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

const isOuterRoomWall = (x, y, roomX, roomY, wallWidth) => {
    return (x >= 0 && x < wallWidth)
        || (x <= roomX - 1 && x > (roomX - 1 - wallWidth))
        || (y >= 0 && y < wallWidth)
        || (y <= roomY - 1 && y > (roomY - 1 - wallWidth))
}

const createPaths = (room, pathSize, openings) => {
    if((!openings) || pathSize <= 0)
        return room;

    for (let i = 0; i < openings.length; i++) {
        clearPathUp(room, pathSize, openings[i]);
    }
    return room;
}

const clearPathUp = (inputRoom, pathSize, directions) => {
    let room = inputRoom;
    for(let x = 0; x < room.length; x++) {
        for(let y = 0; y<room[x].length; y++) {
            if(isPath(room, x, y, pathSize, directions)){
                room[x][y] = false;
            }
        }
    }
    return room;
}

const isPath = (room, x, y, pathSize, direction) => {

    let middleX = Math.floor(room.length / 2);
    let middleY = Math.floor(room[x].length / 2);
    let halfPathDistance = Math.floor((pathSize -1) /2);

    switch (direction){
        case Directions.UP:
            return x <= middleX &&
                y >= middleY - halfPathDistance &&
                y <= middleY + halfPathDistance;
        case Directions.DOWN:
            return x >= middleX &&
                y >= middleY - halfPathDistance &&
                y <= middleY + halfPathDistance;
        case Directions.LEFT:
            return y <= middleY &&
                x >= middleX - halfPathDistance &&
                x <= middleX + halfPathDistance;
        case Directions.RIGHT:
            return y >= middleY &&
                x >= middleX - halfPathDistance &&
                x <= middleX + halfPathDistance;
    }
}

const fillRoomWithCells = (room, config) =>{
    let solidCells = config.cellTypes.filter(c => c.solid);
    solidCells = _.orderBy(solidCells, 'spawnChance', 'desc');

    let nonSolidCells = config.cellTypes.filter(c => !c.solid);
    nonSolidCells = _.orderBy(nonSolidCells, 'spawnChance', 'desc');

    for (let x = 0; x < room.length; x++) {
        for (let y = 0; y < room[x].length; y++) {
            let cellArray = room[x][y] ? solidCells : nonSolidCells;
            room[x][y] = selectCell(cellArray);
        }
    }
    return room;
}

const selectCell = (cellArray) => {
    let cellSelector = randomFromInterval(0, 100);
    if (cellArray.length === 1)
        return cellArray[0];
    for (let i = 0; i < cellArray.length; i++) {
        if(i === cellArray.length - 1)
            return cellArray[i];
        let currentCellChance = getCellChance(cellArray, i);
        if(cellSelector <= currentCellChance){
            return cellArray[i];
        }
    }
}

const getCellChance = (cellArray, index) => {
    let cellChance = 0;
    if(index === 0){
        return cellArray[index].spawnChance;
    }
    for (let i = 0; i <= index; i++) {
        cellChance += cellArray[i].spawnChance;
    }
    return cellChance;
}

export default generateMap