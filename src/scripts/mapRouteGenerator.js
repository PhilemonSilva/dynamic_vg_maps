import {randomFromInterval} from "./randomNumberGenerator";

// Documentation: https://github.com/mhyfritz/hilbert-curve
const hilbertCurve = require("hilbert-curve");

//Amount of extra Rooms extrapolated to randomize paths
const extrapolation = 3;

const generateMapRoute = (roomsPerRow) => {
    let hilbertCurve = generateHilbertCurve(roomsPerRow);
    let offsetHilbertMatrix = generateOffsetHilbertMatrix(roomsPerRow, hilbertCurve);
}

const generateHilbertCurve = (roomsPerRow) => {
    let sideLength = roomsPerRow + extrapolation;
    const extrapolatedArray = Array.from(
        { length: sideLength * sideLength },
        (_, i) => i + 1
    );
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

const generateOffsetHilbertMatrix = (roomsPerRow, hilbertCurve) => {
    let offsetStartX = Math.round(randomFromInterval(0, roomsPerRow - extrapolation + 1));
    let offsetStartY = Math.round(randomFromInterval(0, roomsPerRow - extrapolation + 1));
    let offsetEndX = offsetStartX + roomsPerRow - 1;
    let offsetEndY = offsetStartY + roomsPerRow - 1;

    let offsetMatrix = [];
    for (let i = offsetStartY; i <= offsetEndY; i++) {
        offsetMatrix.push(hilbertCurve[i].slice(offsetStartX, offsetEndX + 1));
    }
    return offsetMatrix;
}

export default generateMapRoute