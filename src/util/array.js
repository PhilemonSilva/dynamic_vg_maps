export default function  sum(array, property) {
    return array.reduce((a,b)=>{
        return a + b[property];
    }, 0)
}