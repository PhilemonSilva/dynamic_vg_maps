import Directions from "../util/directionEnum";
import {setSeed } from "./randomNumberGenerator";

let currentRoom = [];
const amountOrganicPathCells = 4;

const generateRoomPath = (seed, room, pathSize, openings, organicPath = true) =>{
    setSeed(seed);

    currentRoom = room;

    if((!openings) || pathSize <= 0)
        return currentRoom;

    for (let i = 0; i < openings.length; i++) {
        clearPath(pathSize, openings[i], organicPath);
    }
    return currentRoom;
}

const clearPath = (pathSize, directions, organicPath) => {
    for(let y = 0; y < currentRoom.length; y++) {
        for(let x = 0; x<currentRoom[y].length; x++) {
            currentRoom[y][x].isPath = isPath(y, x, pathSize, directions);
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
//
// const generateOrganicPath = (x, y) => {
//     for (let i = x - amountOrganicPathCells; i <= x + amountOrganicPathCells; i++) {
//         for (let j = y - amountOrganicPathCells; j <= y + amountOrganicPathCells; j++) {
//             if (isOutOfBounds(i,j)) {
//                 continue;
//             }
//             if (currentRoom[i][j]) {
//                 currentRoom[i][j] = randomFromInterval(0,100) > 40;
//             }
//         }
//     }
// }
//
// const isOutOfBounds = (x,y) => {
//     return (x < 0 || x >= currentRoom.length || y < 0 || y >= currentRoom[x].length);
// }

export default generateRoomPath;