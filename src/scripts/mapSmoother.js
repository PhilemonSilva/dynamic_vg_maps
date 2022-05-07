const smoothMap = (map) => {
    for (let i = 0; i < 15; i++) {
        map = smooth(map);
    }
    return map;
}

const smooth = (map) => {
    let smoothRoom = map
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            let solidCellCount = getSurroundingSolidCellCount(map, x, y);
            if (solidCellCount > 4)
                smoothRoom[x][y] = true;
            else if (solidCellCount < 4)
                smoothRoom[x][y] = false;
        }
    }
    return smoothRoom;
}

const getSurroundingSolidCellCount = (map, x, y) => {
    let solidCellCount = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i < 0 || i >= map.length || j < 0 || j >= map[i].length) {
                continue;
            }
            if (map[i][j]) {
                solidCellCount++;
            }
        }
    }
    return solidCellCount;
}

export default smoothMap;