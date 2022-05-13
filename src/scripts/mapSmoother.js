import { iterateTroughMatrix } from "../util/array";

// The smoothing algorithm. It makes the matrix look like a cave.
// Read more about it at: https://jeremykun.com/2012/07/29/the-cellular-automaton-method-for-cave-generation/

const smoothMap = (map) => {
    for (let i = 0; i < 15; i++) {
        map = smooth(map);
    }
}

const smooth = (map) => {
    let smoothRoom = map;

    let smoothCell = (x, y) =>  {
        let solidCellCount = getSurroundingSolidCellCount(map, y, x);
        if (solidCellCount > 4)
            smoothRoom[y][x].solid = true;
        else if (solidCellCount < 4)
            smoothRoom[y][x].solid = false;
    }

    iterateTroughMatrix(map,smoothCell);

    return smoothRoom;
}

const getSurroundingSolidCellCount = (map, x, y) => {
    let solidCellCount = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i < 0 || i >= map.length || j < 0 || j >= map[i].length) {
                continue;
            }
            if (map[i][j].solid) {
                solidCellCount++;
            }
        }
    }
    return solidCellCount;
}

export default smoothMap;