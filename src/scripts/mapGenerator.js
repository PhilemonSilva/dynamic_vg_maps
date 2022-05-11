import generateRoom from "./roomGenerator";
import Directions from "../util/directionEnum";
import smoothMap from "./mapSmoother";
import populateCells from "./cellPopulator";
import generateMapRoute from "./mapRoute";

const generateMap = (config) => {
    let roomDimension = config.xCount/ config.roomsPerRow;
    //let map = createEmptyMap(config.roomsPerRow);
    let map = generateRoomRow(config, config.roomsPerRow, roomDimension);
    for (let i = 0; i < config.roomsPerRow; i++) {
        map = map.concat(generateRoomRow(config, config.roomsPerRow, roomDimension));
    }
    map = smoothMap(map);
    map = populateCells(map,config);
    generateMapRoute(config.roomsPerRow);
    return map;
}

const createEmptyMap = (dimension) => {
    let room = [];
    for (let i = 0; i < dimension; i++) {
        room.push([]);
        for (let j = 0; j < dimension; j++) {
            //TODO: Populate directions here.
            //let openings = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT];
            //room[i][j] = { openings: openings };
        }
    }
    return room;
}

const generateRoomRow = (config, roomsPerRow, roomDimension) => {
    let roomRow = createEmptyRoom(roomDimension);
    let rooms = [];
    for (let i = 0; i < roomsPerRow; i++) {
        let openings = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT];
        let room = generateRoom(config, roomDimension, openings);
        rooms.push(room);
    }
    //TODO: Create paths here, maybe????
    for (let i = 0; i < rooms.length; i++) {
        roomRow = concatRoomsHorizontal(roomRow, rooms[i]);
    }
    return roomRow;
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