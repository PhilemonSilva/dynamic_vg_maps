import generateRoom from "./roomGenerator";
import smoothMap from "./mapSmoother";
import populateCells from "./cellPopulator";
import generateMapRoute from "./mapRoute";
import generateEntryAndExit from "./entryAndExitGenerator";

import { iterateTroughMatrix } from "../util/array";

let roomDimension;

const generateMap = (config) => {
    roomDimension = config.xCount/ config.roomsPerRow;

    let mapRoute = generateMapRoute(config.roomsPerRow);
    let roomMatrix = createRoomMatrix(config, mapRoute);
    let map = concatRoomMatrix(roomMatrix, roomDimension);

    if(config.organicPaths)
        clearOrganicCells(map);

    smoothMap(map);
    clearMapRoute(map);
    populateCells(config, map);
    generateEntryAndExit(config, map, mapRoute);

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