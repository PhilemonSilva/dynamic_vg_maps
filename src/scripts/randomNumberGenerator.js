const seedrandom = require('seedrandom');
let rng = seedrandom();

export const setSeed = (seed) => {
    if(seed){
        rng = seedrandom(seed);
    }
}

export const randomFromInterval = (min, max) => {
    // The 'min' and 'max' values are included
    return rng() * (max - min + 1) + min;
}

export const randomIntFromInterval = (min, max) => {
    // The 'min' and 'max' values are included
    return Math.round(randomFromInterval(min, max - 1))
}