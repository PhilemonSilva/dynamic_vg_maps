const seedrandom = require('seedrandom');
const rng  = seedrandom('I am test');

const randomFromInterval = (min, max) => { // min and max included
    return rng() * (max - min + 1) + min;
}

const generateMap = () => {
    let xCount = 100;
    let yCount = 100;
    let fill = 60;

    let solidCell = { solid: true };
    let emptyCell = { solid: false };

    const map = [];
    for (let x = 0; x < xCount; x++){
        map.push([]);
        for (let y = 0; y < yCount; y++) {
            let cellRng = randomFromInterval(0,100);
            if(cellRng < fill)
                map[x].push(solidCell);
            else
                map[x].push(emptyCell);
        }
    }
    return map;
}

const iterateOn = (array, operation) => {

}

export default generateMap