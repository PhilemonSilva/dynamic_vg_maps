import Directions from "../util/directionEnum";
import generateOffsetHilbertCurve from "./hilbertCurve";

const generateMapRoute = (roomsPerRow) => {
    let offsetHilbertCurve = generateOffsetHilbertCurve(roomsPerRow);
    let pathMatrix = generatePathMatrix(offsetHilbertCurve);
}

const generatePathMatrix = (curve) => {
    let beginOfPathCoordinates =  getCoordinatesOfSmallestNumber(curve);
    let entryCoordinates = Object.assign({}, beginOfPathCoordinates);
    let pathMatrix = createEmptyPathMatrix(curve.length);
    let exitCoordinates = fillPathMatrix(pathMatrix, beginOfPathCoordinates, curve);
    return pathMatrix;
}

const getCoordinatesOfSmallestNumber = (matrix) => {
    let smallestNumbersFromRows = [];
    for (let i = 0; i < matrix.length; i++) {
        smallestNumbersFromRows.push(Math.min(...matrix[i]));
    }
    let smallestNumber = Math.min(...smallestNumbersFromRows);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] === smallestNumber){
                return {x: j, y: i};
            }
        }
    }
}

const createEmptyPathMatrix = (length) => {
    let pathMatrix = [];
    for (let i = 0; i < length; i++) {
        pathMatrix.push([]);
        for (let j = 0; j < length; j++) {
            pathMatrix[i][j] = { isPath: false, openings: [] };
        }
    }
    return pathMatrix;
}

const fillPathMatrix = (pathMatrix, coordinates, curve) => {
    let currentX = coordinates.x;
    let currentY = coordinates.y;
    let entryDirection;
    while(true){
        pathMatrix[currentY][currentX].isPath = true;

        if(entryDirection)
            pathMatrix[currentY][currentX].openings.push(entryDirection);

        let neighbours = getNeighbours(coordinates.x, coordinates.y, curve, pathMatrix);

        if(Object.keys(neighbours).length === 0)
            return {x: currentX, y: currentY };

        let smallestNeighbour = getSmallestNeighbour(coordinates, neighbours);
        pathMatrix[currentY][currentX].openings.push(smallestNeighbour.direction);
        currentX = smallestNeighbour.coordinates.x;
        currentY = smallestNeighbour.coordinates.y;
        entryDirection = getOppositeDirection(smallestNeighbour.direction);
    }
}

const getNeighbours = (x, y, curve, pathMatrix) => {
    let neighbours = {};
    if (!isOutOfBounds(x + 1, y, curve) && !pathMatrix[y][x+1].isPath){
        neighbours.right = curve[y][x+1];
    }
    if (!isOutOfBounds(x - 1, y, curve) && !pathMatrix[y][x-1].isPath){
        neighbours.left = curve[y][x-1];
    }
    if (!isOutOfBounds(x, y + 1, curve) && !pathMatrix[y+1][x].isPath){
        neighbours.down = curve[y+1][x];
    }
    if (!isOutOfBounds(x, y - 1, curve) && !pathMatrix[y-1][x].isPath){
        neighbours.up = curve[y-1][x];
    }
    return neighbours;
}

const getSmallestNeighbour = (coordinates, neighbours) => {
    let values = Object.values(neighbours);
    let smallestValue = Math.min(...values);
    if(neighbours["right"] === smallestValue){
        coordinates.x += 1;
        return { coordinates: coordinates, direction: Directions.RIGHT };
    }
    if(neighbours["left"] === smallestValue){
        coordinates.x -= 1;
        return { coordinates: coordinates, direction: Directions.LEFT };
    }
    if(neighbours["up"] === smallestValue){
        coordinates.y -= 1;
        return { coordinates: coordinates, direction: Directions.UP };
    }
    coordinates.y += 1;
    return { coordinates: coordinates, direction: Directions.DOWN };
}

const isOutOfBounds = (x,y,curve) => {
    return (x < 0 || x >= curve.length || y < 0 || y >= curve[x].length);
}

const getOppositeDirection = (direction) => {
    switch(direction){
        case Directions.UP:
            return Directions.DOWN;
        case Directions.RIGHT:
            return Directions.LEFT;
        case Directions.DOWN:
            return Directions.UP;
        case Directions.LEFT:
            return Directions.RIGHT;
    }
}

export default generateMapRoute;