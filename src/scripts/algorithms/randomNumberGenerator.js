const seedrandom = require('seedrandom');
let rng = seedrandom();
let previouslyUsedSeed = '';

// This class is a random number generator. It creates the number based on a previously established seed.

export const setSeed = (seed) => {
    if(seed) rng = seedrandom(seed);
    else{
        previouslyUsedSeed = makeRandomSeed(15);
        rng = seedrandom(previouslyUsedSeed);
    }
}

export const getLastUsedSeed = () => {
    return previouslyUsedSeed;
}

export const randomFromInterval = (min, max) => {
    // The 'min' and 'max' values are included
    return rng() * (max - min + 1) + min;
}

export const randomIntFromInterval = (min, max) => {
    // The 'min' and 'max' values are included
    return Math.round(randomFromInterval(min, max - 1))
}

const makeRandomSeed = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}