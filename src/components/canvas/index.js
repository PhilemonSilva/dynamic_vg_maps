import React, { useCallback } from 'react'
import useCanvas from "./canvasManager";
import generateMap from "../../scripts/mapGenerator";

const Canvas = props => {

    const red = '#e74c3c';
    const yellow = '#f1c40f';
    const cellSide = 3;

    const testCellRed = { color: red }
    const testCellYellow = { color: yellow }

    const map  = generateMap();
    const draw = useCallback((context) => {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                let x = j * cellSide;
                let y = i * cellSide;
                context.beginPath();
                context.fillStyle = yellow;
                if(map[i][j].solid)
                    context.fillStyle = red;
                context.fillRect(x, y, cellSide, cellSide);
            }
        }
    },[ cellSide, [JSON.stringify(map)]])

    const canvasRef = useCanvas(draw);

    return <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '85%', border: '1px solid #000000'}}
        {...props}
    />
}

export default Canvas