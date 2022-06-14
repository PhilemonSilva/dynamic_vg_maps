import { randomIntFromInterval } from "./randomNumberGenerator";
import { nextPowerOf2 } from "../util/general";
import {createArrayFromSideLength} from "../util/array";

// Documentation: https://github.com/mhyfritz/hilbert-curve
const hilbertCurve = require("hilbert-curve");

const generateOffsetHilbertCurve = (roomsPerRow) => {
    let hilbertCurve = generateHilbertCurve(roomsPerRow);
    let numberOfRotations = randomIntFromInterval(0,3);
    for (let i = 0; i <= numberOfRotations; i++) {
        hilbertCurve = rotateMatrixRight(hilbertCurve);
    }
    return generateOffsetHilbertMatrix(roomsPerRow, hilbertCurve);
}

//The Hilbert Curve algorithm, as implemented by Markus Hsi-Yang Fritz.
//The Hilbert Curve can only be constructed with numbers that are a power of 2 (2^n):
const generateHilbertCurve = (roomsPerRow) => {
    let sideLength = nextPowerOf2(roomsPerRow);

    const extrapolatedArray = createArrayFromSideLength(sideLength);
    let extrapolatedHilbertCurveArray = hilbertCurve.construct(extrapolatedArray);

    return createHilbertCurveMatrix(extrapolatedHilbertCurveArray, sideLength)
}

// The "hilbertCurve.construct" function returns a regular array.
// Here I convert it to a matrix:
const createHilbertCurveMatrix = (array, sideLength) => {
    let result = [];
    for (let i = 0; i < array.length; i += sideLength) {
        result.push(array.slice(i, i + sideLength));
    }
    return result;
}

//  If the hilbert curve Matrix is not rotated, we get a strong bias
//for paths that occupy only one diagonal of the path :
const rotateMatrixRight = (matrix) => {
    //Code taken from:
    //https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
}

//Gets a random subsection off of the original Hilbert Curve matrix:
const generateOffsetHilbertMatrix = (roomsPerRow, hilbertCurve) => {
    let offsetStartX = randomIntFromInterval(0, (hilbertCurve.length - roomsPerRow));
    let offsetStartY = randomIntFromInterval(0, (hilbertCurve.length - roomsPerRow));
    let offsetEndX = offsetStartX + roomsPerRow - 1;
    let offsetEndY = offsetStartY + roomsPerRow - 1;

    let offsetMatrix = [];
    for (let i = offsetStartY; i <= offsetEndY; i++) {
        offsetMatrix.push(hilbertCurve[i].slice(offsetStartX, offsetEndX + 1));
    }
    return offsetMatrix;
}

export default generateOffsetHilbertCurve