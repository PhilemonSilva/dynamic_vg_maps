const smoothMap = (map) => {
    for (let i = 0; i < 15; i++) {
        map = smooth(map);
    }
    return map;
}

const smooth = (map) => {
    let smoothRoom = map
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            let solidCellCount = getSurroundingSolidCellCount(map, y, x);
            if (solidCellCount > 4)
                smoothRoom[y][x].solid = true;
            else if (solidCellCount < 4)
                smoothRoom[y][x].solid = false;
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
            if (map[i][j].solid) {
                solidCellCount++;
            }
        }
    }
    return solidCellCount;
}

export default smoothMap;