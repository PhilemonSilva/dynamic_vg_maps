import Directions from "../util/directionEnum";
import generateOffsetHilbertCurve from "./hilbertCurve";

import { iterateTroughMatrix, isOutOfBoundsMatrix } from "../util/array";
import { randomFromInterval} from "./randomNumberGenerator";

//This class generates a random path through the map.

const generateMapRoute = (config) => {
    let offsetHilbertCurve = generateOffsetHilbertCurve(config.roomsPerRow);
    let pathMatrixData = generatePathMatrix(offsetHilbertCurve);
    pathMatrixData.pathMatrix = generateDeadEnds(pathMatrixData.pathMatrix, config.deadEndSpawnChance);
    return pathMatrixData;
}

//  All the functions bellow are used for the goal of interpreting the numbers of the Hilbert Curve
//to create the directions of the paths in each room in the map matrix.

//  I hope I named all the variables appropriately, but this section is a bit complicated...
//  So if you need help, e-mail me at "philemon.silva@gmail.com" and I'll respond in due time.

const generatePathMatrix = (curve) => {
    let beginOfPathCoordinates =  getCoordinatesOfSmallestNumber(curve);
    let entryCoordinates = Object.assign({}, beginOfPathCoordinates);
    let pathMatrix = createEmptyPathMatrix(curve.length);
    let exitCoordinates = fillPathMatrix(pathMatrix, beginOfPathCoordinates, curve);
    return {
        entryRoomCoordinates: entryCoordinates,
        exitRoomCoordinates: exitCoordinates,
        pathMatrix: pathMatrix
    };
}

//Get the smallest number in the Hilbert Curve matrix:
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
    if (isNeighbourAndNotPath(x+1, y, pathMatrix)){
        neighbours.right = curve[y][x+1];
    }
    if (isNeighbourAndNotPath(x-1, y, pathMatrix)){
        neighbours.left = curve[y][x-1];
    }
    if (isNeighbourAndNotPath(x, y+1, pathMatrix)){
        neighbours.down = curve[y+1][x];
    }
    if (isNeighbourAndNotPath(x, y - 1, pathMatrix)){
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
        default:
            return null;
    }
}

const generateDeadEnds = (pathMatrix, deadEndChance) => {
    let createPathRooms = (x, y) => {
        if(pathMatrix[y][x].openings.length !== 0) return;

        let firstNeighbour = getFirstNeighbour(x,y, pathMatrix);
        if(!firstNeighbour) return;

        if(randomFromInterval(0,100) > deadEndChance) return;

        pathMatrix[y][x].openings.push(firstNeighbour.direction);

        let oppositeDirection = getOppositeDirection(firstNeighbour.direction);
        pathMatrix[firstNeighbour.y][firstNeighbour.x].openings.push(oppositeDirection);
    }

    iterateTroughMatrix(pathMatrix, createPathRooms);
    return pathMatrix;
}

const getFirstNeighbour = (x, y, pathMatrix) => {
    if (isNeighbourAndPath(x + 1, y, pathMatrix)){
        return { x: x + 1, y: y, direction: Directions.RIGHT };
    }
    if (isNeighbourAndPath(x - 1, y, pathMatrix)){
        return { x: x - 1, y: y, direction: Directions.LEFT };
    }
    if (isNeighbourAndPath(x, y + 1, pathMatrix)){
        return { x: x, y: y + 1, direction: Directions.DOWN };
    }
    if (isNeighbourAndPath(x, y - 1, pathMatrix)){
        return { x: x, y: y - 1, direction: Directions.UP };
    }
    return null;
}

const isNeighbourAndNotPath = (x, y, pathMatrix) => {
    return !(isOutOfBoundsMatrix(x, y, pathMatrix) || pathMatrix[y][x].isPath);
}

const isNeighbourAndPath = (x, y, pathMatrix) => {
    return (!isOutOfBoundsMatrix(x, y, pathMatrix)) && pathMatrix[y][x].isPath;
}

export default generateMapRoute;