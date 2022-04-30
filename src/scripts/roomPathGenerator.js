import Directions from "../util/directionEnum";

let currentRoom = [];

const seedrandom = require('seedrandom');
let rng = seedrandom();

const randomFromInterval = (min, max) => {
    // The 'min' and 'max' values are included
    return rng() * (max - min + 1) + min;
}

const generateRoomPath = (seed, room, pathSize, openings, organicPath = true) =>{
    if (seed) {
        rng = seedrandom(seed);
    }
    currentRoom = room;

    if((!openings) || pathSize <= 0)
        return currentRoom;

    for (let i = 0; i < openings.length; i++) {
        clearPath(pathSize, openings[i], organicPath);
    }
    return currentRoom;
}

const clearPath = (pathSize, directions, organicPath) => {
    for(let x = 0; x < currentRoom.length; x++) {
        for(let y = 0; y<currentRoom[x].length; y++) {
            if(isPath(x, y, pathSize, directions)){
                currentRoom[x][y] = false;
                if(organicPath){
                    generateOrganicPath(x,y);
                }
            }
        }
    }
}

const isPath = (x, y, pathSize, direction) => {

    let middleX = Math.floor(currentRoom.length / 2);
    let middleY = Math.floor(currentRoom[x].length / 2);
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
        default: return false;
    }
}

const generateOrganicPath = (x, y) => {
    for (let i = x - 4; i <= x + 4; i++) {
        for (let j = y - 4; j <= y + 4; j++) {
            if (isOutOfBounds(i,j)) {
                continue;
            }
            if (currentRoom[i][j]) {
                currentRoom[i][j] = randomFromInterval(0,100) > 40;
            }
        }
    }
}

const isOutOfBounds = (x,y) => {
    return (x < 0 || x >= currentRoom.length || y < 0 || y >= currentRoom[x].length);
}

export default generateRoomPath;