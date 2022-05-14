import generateRoom from "./roomCreation/roomGenerator";
import smoothMap from "./algorithms/smoothing";
import populateCells from "./cellAssignment/cellPopulator";
import generateMapRoute from "./mapRouteGenerator";
import generateEntryAndExit from "./cellAssignment/entryAndExitGenerator";

import { iterateTroughMatrix } from "./util/array";
import { log } from "../loggers/InternalLogger";
import { setSeed } from "./algorithms/randomNumberGenerator";

// This is the class that generates the map as a whole (a matrix of rooms).

let roomDimension;

const generateMap = (config) => {
    log(`Creating ${config.mapDimension}x${config.mapDimension} map...`);

    setSeed(config.seed);
    roomDimension = config.mapDimension/ config.roomsPerRow;    //Size of the sides of the rooms.

    let mapRoute = generateMapRoute(config);                    //Creates a random path through the map.
    let roomMatrix = createRoomMatrix(config, mapRoute);        //Creates a matrix of rooms.
    let map = concatRoomMatrix(roomMatrix, roomDimension);      //Concatenates all rooms to create a matrix of cells.

    if(config.organicPaths)
        clearOrganicCells(map);                                 //Clears some cells to make a more cave looking path.
    smoothMap(map);                                             //Algorithm that makes the map look like a cave.
    clearMapRoute(map);                                         //Clears the path through the map.
    populateCells(config, map);                                 //Populates map with the cells from the configuration.
    generateEntryAndExit(config, map, mapRoute);                //Generates the entry and exit of the map.

    log(`Map created!`);
    return map;
}

const createRoomMatrix = (config, mapRoute) => {
    let roomMatrix = []
    let pathMatrix = mapRoute.pathMatrix;
    for (let y = 0; y < config.roomsPerRow; y++) {
        roomMatrix.push(generateRoomArray(config, pathMatrix[y]));
    }
    return roomMatrix;
}

const generateRoomArray = (config, mapRouteRow) => {
    let rooms = [];
    for (let x = 0; x < config.roomsPerRow; x++) {
        let room = generateRoom(config, roomDimension, mapRouteRow[x].openings);
        rooms.push(room);
    }
    return rooms;
}

const concatRoomMatrix = (roomMatrix) => {
    let result = [];
    for (let i = 0; i < roomMatrix.length; i++) {
        let mapRow = concatRoomArray(roomMatrix[i]);         //concat horizontal
        result = result.concat(mapRow);                      //concat vertical
    }
    return result;
}

const concatRoomArray = (roomArray) => {
    let result = createEmptyRoom();
    for (let i = 0; i < roomArray.length; i++) {
        result = concatRoomsHorizontal(result, roomArray[i]);
    }
    return result;
}

const createEmptyRoom = () => {
    let room = [];
    for (let i = 0; i < roomDimension; i++) {
        room.push([]);
    }
    return room;
}

const concatRoomsHorizontal = (roomA, roomB) => {
    let result = [];
    for (let i = 0; i < roomA.length; i++) {
        result.push(roomA[i].concat(roomB[i]));
    }
    return result;
}

const clearMapRoute = (map) => {

    let clearRouteCell = (x, y)=> {
        if((map[y][x].isPath || map[y][x].isOrganicPath) && map[y][x].solid){
            map[y][x].solid = false;
        }
    }

    iterateTroughMatrix(map, clearRouteCell);
}

const clearOrganicCells = (map) => {

    let clearOrganicCell = (x,y) => {
        if(map[y][x].isOrganicPath && map[y][x].solid){
            map[y][x].solid = false;
        }
    }

    iterateTroughMatrix(map, clearOrganicCell);
}

export default generateMap;