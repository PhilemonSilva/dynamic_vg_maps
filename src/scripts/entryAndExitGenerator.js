import {getMiddleNumberBetween} from "../util/general";

const generateEntryAndExit = (config, map, mapRoute) => {
    let coordinates = getEntryAndExitRoomBoundaries(config, mapRoute);
    let entryCoordinates = coordinates.entryCellCoordinates;
    let exitCoordinates = coordinates.exitCellCoordinates;
    map[entryCoordinates.y][entryCoordinates.x] = config.entryCell;
    map[exitCoordinates.y][exitCoordinates.x] = config.exitCell;
}

const getEntryAndExitRoomBoundaries = (config, mapRoute) => {
    let roomDimension = config.mapDimension/ config.roomsPerRow;

    let entryRoomBoundaries = getRoomBoundaries(mapRoute.entryRoomCoordinates, roomDimension);
    let exitRoomBoundaries = getRoomBoundaries(mapRoute.exitRoomCoordinates, roomDimension);

    return {
        entryCellCoordinates: getMiddleOfRoomCoordinates(entryRoomBoundaries),
        exitCellCoordinates: getMiddleOfRoomCoordinates(exitRoomBoundaries)
    }
}

const getRoomBoundaries = (roomCoordinates, roomDimension) => {
    let maximumX = ((roomCoordinates.x + 1) * roomDimension) - 1;
    let minimumX = maximumX - roomDimension + 1;
    let maximumY = ((roomCoordinates.y + 1) * roomDimension) - 1;
    let minimumY = maximumY - roomDimension + 1;

    return {
        minimumX: minimumX,
        maximumX: maximumX,
        minimumY: minimumY,
        maximumY: maximumY
    };
}

const getMiddleOfRoomCoordinates = (roomBoundaries) => {
    return {
        x: getMiddleNumberBetween(roomBoundaries.minimumX, roomBoundaries.maximumX),
        y: getMiddleNumberBetween(roomBoundaries.minimumY, roomBoundaries.maximumY)
    };
}

export default generateEntryAndExit;