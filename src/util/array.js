export function  sum(array, property) {
    return array.reduce((a,b)=>{
        return a + b[property];
    }, 0)
}

export const isOutOfBoundsMatrix = (x, y, matrix) => {
    return (y < 0 || y >= matrix.length || x < 0 || x >= matrix[y].length);
}

export const iterateTroughMatrix = (matrix, execute) => {
    for(let y = 0; y < matrix.length; y++) {
        for(let x = 0; x < matrix[y].length; x++) {
            //Executes Callback functions:
            execute(x, y);
        }
    }
}