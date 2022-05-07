import {log} from "../loggers/InternalLogger";
import generateRoomPath from './roomPathGenerator';
import {setSeed, randomFromInterval} from "./randomNumberGenerator";

const generateRoom = (config, dimension, openings) => {
    if (!config.cellTypes || config.cellTypes.length <= 0)
        return [];

    setSeed(config.seed);
    log(`Creating ${dimension}x${dimension} room...`);

    let room = generateRandomRoom(config, dimension);
    room = generateRoomPath(config.seed, room, config.pathWidth, openings, config.organicPaths);

    log(`Room created...!`);
    return room;
}

const generateRandomRoom = (config, dimension) => {
    const room = [];
    for (let x = 0; x < dimension; x++) {
        room.push([]);
        for (let y = 0; y < dimension; y++) {
            if (isOuterRoomWall(x, y, dimension, config.roomWallMinimumWidth)) {
                room[x].push(true);
                continue;
            }
            let cellRng = randomFromInterval(0, 100);
            room[x].push(cellRng < config.fill);
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