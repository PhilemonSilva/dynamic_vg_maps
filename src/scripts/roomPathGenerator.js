import Directions from "../util/directionEnum";
import { randomFromInterval} from "./randomNumberGenerator";
import { iterateTroughMatrix, isOutOfBoundsMatrix } from "../util/array";

let currentRoom = [];
const amountOrganicPathCells = 1;

//  This class defines the cells that belong to the map route,
//as well as define "organic cells" for more natural looking paths

const generateRoomPath = (config, room, openings) =>{
    currentRoom = room;

    if((!openings) || config.pathWidth <= 0)
        return currentRoom;

    for (let i = 0; i < openings.length; i++) {
        setPath(config, openings[i]);
    }
    return currentRoom;
}

const setPath = (config, directions) => {
    let pathSize = config.pathWidth;

    let pathCreator = (x, y) => {
        if(!currentRoom[y][x].isPath){
            currentRoom[y][x].isPath = isPath(y, x, pathSize, directions);
            if(config.organicPaths && currentRoom[y][x].isPath){
                generateOrganicPath(x,y, config.fill);
            }
        }
    }

    iterateTroughMatrix(currentRoom, pathCreator);
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

const generateOrganicPath = (x, y, fill) => {
    for (let i = y - amountOrganicPathCells; i <= y + amountOrganicPathCells; i++) {
        for (let j = x - amountOrganicPathCells; j <= x + amountOrganicPathCells; j++) {
            if (isOutOfBoundsMatrix(i,j, currentRoom)) {
                continue;
            }
            if (currentRoom[i][j].solid && !currentRoom[i][j].isPath) {
                if(randomFromInterval(0,100) > fill)
                    currentRoom[i][j].isOrganicPath = true;
            }
        }
    }
}

export default generateRoomPath;