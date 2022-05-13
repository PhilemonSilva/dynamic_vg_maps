import generateRoom from "./roomGenerator";
import smoothMap from "./mapSmoother";
import populateCells from "./cellPopulator";
import generateMapRoute from "./mapRoute";

const generateMap = (config) => {
    let roomDimension = config.xCount/ config.roomsPerRow;
    let mapRoute = generateMapRoute(config.roomsPerRow);
    let roomMatrix = createRoomMatrix(config, roomDimension, mapRoute);
    let map = concatRoomMatrix(roomMatrix, roomDimension);
    map = clearOrganicCells(map);
    map = smoothMap(map);
    map = clearMapRoute(map);
    map = populateCells(map,config, mapRoute);
    return map;
}

const createRoomMatrix = (config, roomDimension, mapRoute) => {
    let roomMatrix = []
    let pathMatrix = mapRoute.pathMatrix;
    for (let y = 0; y < config.roomsPerRow; y++) {
        roomMatrix.push(generateRoomArray(config, roomDimension, pathMatrix[y]));
    }
    return roomMatrix;
}

const generateRoomArray = (config, roomDimension, mapRouteRow) => {
    let rooms = [];
    for (let x = 0; x < config.roomsPerRow; x++) {
        let room = generateRoom(config, roomDimension, mapRouteRow[x].openings);
        rooms.push(room);
    }
    return rooms;
}

const concatRoomMatrix = (roomMatrix, roomDimension) => {
    let result = [];
    for (let i = 0; i < roomMatrix.length; i++) {
        let mapRow = concatRoomArray(roomMatrix[i],roomDimension);  //concat horizontal
        result = result.concat(mapRow);                             //concat vertical
    }
    return result;
}

const concatRoomArray = (roomArray, roomDimension) => {
    let result = createEmptyRoom(roomDimension);
    for (let i = 0; i < roomArray.length; i++) {
        result = concatRoomsHorizontal(result, roomArray[i]);
    }
    return result;
}

const createEmptyRoom = (dimension) => {
    let room = [];
    for (let i = 0; i < dimension; i++) {
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
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if((map[y][x].isPath || map[y][x].isOrganicPath) && map[y][x].solid){
                map[y][x].solid = false;
            }
        }
    }
    return map;
}

const clearOrganicCells = (map) => {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if(map[y][x].isOrganicPath && map[y][x].solid){
                map[y][x].solid = false;
            }
        }
    }
    return map;
}

export default generateMap;