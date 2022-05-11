import generateRoom from "./roomGenerator";
import Directions from "../util/directionEnum";
import smoothMap from "./mapSmoother";
import populateCells from "./cellPopulator";
import generateMapRoute from "./mapRoute";

const generateMap = (config) => {
    let roomDimension = config.xCount/ config.roomsPerRow;
    let roomMatrix = createRoomMatrix(config, roomDimension);
    let map = concatRoomMatrix(roomMatrix, roomDimension);
    map = smoothMap(map);
    map = populateCells(map,config);
    generateMapRoute(config.roomsPerRow);
    return map;
}

const createRoomMatrix = (config, roomDimension) => {
    let roomMatrix = []
    for (let i = 0; i < config.roomsPerRow; i++) {
        roomMatrix.push(generateRoomArray(config, config.roomsPerRow, roomDimension));
    }
    return roomMatrix;
}
const generateRoomArray = (config, amountOfRooms, roomDimension) => {
    let rooms = [];
    for (let i = 0; i < amountOfRooms; i++) {
        let openings = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT];
        let room = generateRoom(config, roomDimension, openings);
        rooms.push(room);
    }
    return rooms;
}

const concatRoomMatrix = (roomMatrix, roomDimension) => {
    let result = [];
    for (let i = 0; i < roomMatrix.length; i++) {
        let mapRow = concatRoomArray(roomMatrix[i],roomDimension);  //concat horizontal
        result = result.concat(mapRow);                                      //concat vertical
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

export default generateMap;