
//#region imports
import React, { useState, useEffect, useRef, useCallback }   from 'react';
import PropTypes from 'prop-types';
import {draw, useCanvas} from "./canvasManager";
import useWindowDimensions from "../../general/windowDimension";
//#endregion

const Canvas = () => {

    const canvasRef = useRef(null);
    const [canvas, setCanvas] =  useState(null);

    const cellSide = 200;

    const [map, setMap] = useState([
        ['R', 'Y', 'R'],
        ['Y', 'R', 'Y'],
        ['R', 'Y', 'R']
    ])

    const [coordinate, setCoordinate] = useState({x:null,y:null});


    const { height, width } = useWindowDimensions();
    const [canvasWidth, setCanvasWidth] = useState(height);
    const [canvasHeight, setCanvasHeight] = useState(width);

    useEffect(()=>{
        const canvasObj = canvasRef.current;
        setCanvas(canvasObj.getContext('2d'));
    },[])

    useEffect(()=>{
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                let x = j * cellSide;
                let y = i * cellSide;

                let cellColor = '#e74c3c';
                if (map[i][j] === 'Y') cellColor = '#f1c40f';

                canvas.beginPath();
                canvas.fillStyle = cellColor;
                canvas.fillRect(x, y, cellSide, cellSide);
            }
        }
    }, [canvas, map]);

    function getCursorPosition(event) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setCoordinate({ x: x +10, y:y+10});

        console.log("x: " + x + " y: " + y)
    }
    return (
        <>
            <canvas
                //style={{width: '60%' , height: '80%'}}
                ref={canvasRef}
                // width='60%'
                // height={canvasHeight}
                onClick={getCursorPosition}
            />
        </>
    );
}

Canvas.propTypes = {
}

Canvas.defaultProps = {
}

export default Canvas;