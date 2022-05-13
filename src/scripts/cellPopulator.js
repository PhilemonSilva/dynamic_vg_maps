import _ from "lodash";

import { randomFromInterval } from "./randomNumberGenerator";
import { iterateTroughMatrix } from "../util/array";

//  This class populates every cell in the map with a cell from the "config" variable,
//according to its spawn chance.

const populateCells = (config, map) =>{
    let solidCells = config.cellTypes.filter(c => c.solid);
    solidCells = _.orderBy(solidCells, 'spawnChance', 'desc');

    let nonSolidCells = config.cellTypes.filter(c => !c.solid);
    nonSolidCells = _.orderBy(nonSolidCells, 'spawnChance', 'desc');

    let chooseCell = (x, y) => {
        map[y][x] = selectCell(map[y][x].solid ? solidCells: nonSolidCells);
    }

    iterateTroughMatrix(map, chooseCell);
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


export default populateCells;