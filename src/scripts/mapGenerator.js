import generateRoom from "./roomGenerator";
import Directions from "../util/directionEnum";

const generateMap = (config) => {
    let roomSize = config.xCount/ config.roomsPerRow;
    //let map = createEmptyMap(config.roomsPerRow);
    let map = generateRoomRow(config, config.roomsPerRow, roomSize);
    for (let i = 0; i < config.roomsPerRow; i++) {
        map = map.concat(generateRoomRow(config, config.roomsPerRow, roomSize));
    }
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

const generateRoomRow = (config, roomsPerRow, roomSize) => {
    let roomRow = createEmptyRoom(roomSize);
    let rooms = [];
    for (let i = 0; i < roomsPerRow; i++) {
        let openings = [Directions.UP, Directions.DOWN, Directions.LEFT, Directions.RIGHT];
        let room = generateRoom(config, {x:roomSize, y:roomSize}, openings);
        rooms.push(room);
    }
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

const concatRoomRowsVertical = (rowA, rowB) => {
    let result = rowA;
    for (let i = 0; i < rowB.length; i++) {
        result.push(rowB[i]);
    }
    return result;
}

export default generateMap;