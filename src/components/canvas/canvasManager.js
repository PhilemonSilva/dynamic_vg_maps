import React, { useState, useEffect, useRef, useCallback } from 'react';
import useWindowDimensions from "../../general/windowDimension";

// Path2D for a Heart SVG
const heartSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
const SVG_PATH = new Path2D(heartSVG);

// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;

// export const canvasWidth = window.innerWidth * .5;
// export const canvasHeight = window.innerHeight * .9;

export function draw(ctx, location){
    ctx.fillStyle = 'red';
    ctx.shadowColor = 'blue';
    ctx.shadowBlur = 15;
    ctx.save();
    ctx.scale(SCALE, SCALE);
    ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
    ctx.rotate(225 * Math.PI / 180);
    ctx.fill(SVG_PATH);
    // .restore(): Canvas 2D API restores the most recently saved canvas state
    ctx.restore();
}

export function useCanvas(){
    const canvasRef = useRef(null);
    const [coordinate, setCoordinate] = useState({x:null,y:null});
    const { height, width } = useWindowDimensions();
    const [canvasWidth, setCanvasWidth] = useState(height);
    const [canvasHeight, setCanvasHeight] = useState(width);

    let updateCanvasSize = useCallback(()=>{
        setCanvasWidth(height * .5);
        setCanvasHeight(width * .9)
    }, [height, width]);
    useEffect(()=>{
        updateCanvasSize()
    }, [updateCanvasSize]);

    useEffect(()=>{
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        // clear the canvas area before rendering the coordinate held in state
        ctx.clearRect( 0,0, canvasWidth, canvasHeight );
        draw(ctx, coordinate);
    });

    return [ coordinate, setCoordinate, canvasRef, canvasWidth, canvasHeight ];
}

