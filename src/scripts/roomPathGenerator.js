import Directions from "../util/directionEnum";
import { setSeed, randomFromInterval} from "./randomNumberGenerator";

let currentRoom = [];
const amountOrganicPathCells = 1;

const generateRoomPath = (seed, room, pathSize, openings, organicPath = true) =>{
    setSeed(seed);

    currentRoom = room;

    if((!openings) || pathSize <= 0)
        return currentRoom;

    for (let i = 0; i < openings.length; i++) {
        setPath(pathSize, openings[i], organicPath);
    }
    return currentRoom;
}

const setPath = (pathSize, directions, organicPath) => {
    for(let y = 0; y < currentRoom.length; y++) {
        for(let x = 0; x < currentRoom[y].length; x++) {
            if(!currentRoom[y][x].isPath){
                currentRoom[y][x].isPath = isPath(y, x, pathSize, directions);
                if(organicPath && currentRoom[y][x].isPath){
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
    for (let i = y - amountOrganicPathCells; i <= y + amountOrganicPathCells; i++) {
        for (let j = x - amountOrganicPathCells; j <= x + amountOrganicPathCells; j++) {
            if (isOutOfBounds(i,j)) {
                continue;
            }
            if (currentRoom[i][j].solid && !currentRoom[i][j].isPath) {
                if(randomFromInterval(0,100) > 40)
                    currentRoom[i][j].isOrganicPath = true;
            }
        }
    }
}

const isOutOfBounds = (x,y) => {
    return (x < 0 || x >= currentRoom.length || y < 0 || y >= currentRoom[x].length);
}

export default generateRoomPath;