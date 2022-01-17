
//#region imports
import React from 'react';
import PropTypes from 'prop-types';
import {useCanvas} from "./canvasManager";
//#endregion

const Canvas = () => {
    const [ coordinate, setCoordinate, canvasRef, canvasWidth, canvasHeight ] = useCanvas();

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
                style={{width: '60%' , height: '80%'}}
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