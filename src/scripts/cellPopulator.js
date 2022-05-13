import _ from "lodash";
import {randomFromInterval} from "./randomNumberGenerator";

const populateCells = (map, config, mapRoute) =>{
    let solidCells = config.cellTypes.filter(c => c.solid);
    solidCells = _.orderBy(solidCells, 'spawnChance', 'desc');

    let nonSolidCells = config.cellTypes.filter(c => !c.solid);
    nonSolidCells = _.orderBy(nonSolidCells, 'spawnChance', 'desc');

    let entryAndExitRange = getEntryAndExitRoomBoundaries(config, mapRoute);

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if(map[y][x].solid){
                map[y][x] = selectCell(solidCells);
                continue;
            }
            if(isWithinRoomBoundaries(x,y, entryAndExitRange.entryRoomBoundaries)){
                map[y][x] = config.entryCell;//
                continue;
            }
            if(isWithinRoomBoundaries(x,y, entryAndExitRange.exitRoomBoundaries)){
                map[y][x] = config.exitCell;
                continue;
            }
            map[y][x] = selectCell(nonSolidCells);
        }
    }
    return map;
}

const selectCell = (cellArray) => {
    let cellSelector = randomFromInterval(0, 100);
    if (cellArray.length === 1)
        return cellArray[0];
    for (let i = 0; i < cellArray.length; i++) {
        if(i === cellArray.length - 1)
            return cellArray[i];
        let currentCellChance = getCellChance(cellArray, i);
        if(cellSelector <= currentCellChance){
            return cellArray[i];
        }
    }
}

const getCellChance = (cellArray, index) => {
    let cellChance = 0;
    if(index === 0){
        return cellArray[index].spawnChance;
    }
    for (let i = 0; i <= index; i++) {
        cellChance += cellArray[i].spawnChance;
    }
    return cellChance;
}

const getEntryAndExitRoomBoundaries = (config, mapRoute) => {
    let roomDimension = config.xCount/ config.roomsPerRow;
    return {
        entryRoomBoundaries: getRange(mapRoute.entryRoomCoordinates, roomDimension),
        exitRoomBoundaries: getRange(mapRoute.exitRoomCoordinates, roomDimension)
    }
}

const getRange = (roomCoordinates, roomDimension) => {
    let maximumX = ((roomCoordinates.x + 1) * roomDimension) - 1;
    let minimumX = maximumX - roomDimension;
    let maximumY = ((roomCoordinates.y + 1) * roomDimension) - 1;
    let minimumY = maximumY - roomDimension;

    return {
        minimumX: minimumX,
        maximumX: maximumX,
        minimumY: minimumY,
        maximumY: maximumY
    };
}

const isWithinRoomBoundaries = (x, y, roomBoundaries) => {
    return (x >= roomBoundaries.minimumX && x <= roomBoundaries.maximumX)
        && (y >= roomBoundaries.minimumY && y <= roomBoundaries.maximumY);
}

export default populateCells;