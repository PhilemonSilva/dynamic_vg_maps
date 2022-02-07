import React, {useRef, useEffect, useState, useCallback} from 'react'
import useCanvas from "./canvasManager";

const Canvas = props => {

    const red = '#e74c3c';
    const yellow = '#f1c40f';
    const cellSide = 200;

    const [map, setMap] = useState([
        [red, yellow, red],
        [yellow, red, yellow],
        [red, yellow, red]
    ]);

    const draw = useCallback((context) => {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                let x = j * cellSide;
                let y = i * cellSide;
                context.beginPath();
                context.fillStyle = map[i][j];
                context.fillRect(x, y, cellSide, cellSide);
            }
        }
    },[[JSON.stringify(map)]])

    const canvasRef = useCanvas(draw)

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas