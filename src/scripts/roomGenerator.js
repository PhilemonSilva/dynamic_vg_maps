import generateRoomPath from './roomPathGenerator';
import {setSeed, randomFromInterval} from "./randomNumberGenerator";

// This class creates the rooms of the map, as well as generate its walls

const generateRoom = (config, dimension, openings) => {
    if (!config.cellTypes || config.cellTypes.length <= 0)
        return [];
    let room = generateRandomRoom(config, dimension);
    room = generateRoomPath(config, room, openings);
    return room;
}

const generateRandomRoom = (config, dimension) => {
    const room = [];
    for (let y = 0; y < dimension; y++) {
        room.push([]);
        for (let x = 0; x < dimension; x++) {
            if (isOuterRoomWall(y, x, dimension, config.roomWallMinimumWidth)) {
                room[y].push({ solid: true });
                continue;
            }
            let cellRng = randomFromInterval(0, 100);
            room[y].push({ solid: cellRng < config.fill });
        }
    }
    return room;
}

const isOuterRoomWall = (x, y, dimension, wallWidth) => {
    return (x >= 0 && x < wallWidth)
        || (x <= dimension - 1 && x > (dimension - 1 - wallWidth))
        || (y >= 0 && y < wallWidth)
        || (y <= dimension - 1 && y > (dimension - 1 - wallWidth))
}

export default generateRoom