import React, {useCallback} from 'react'
import useCanvas from "./canvasManager";
import generateMap from "../../scripts/mapGenerator";
import PropTypes from 'prop-types';

const Canvas = ({ config, ...props}) => {
    const cellSide = 2;

    const red = '#e74c3c';
    const yellow = '#f1c40f';

    const map  = generateMap(config);
    const draw = useCallback((context) => {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                let x = j * cellSide;
                let y = i * cellSide;
                context.beginPath();
                context.fillStyle = yellow;
                if(map[i][j])
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

Canvas.propTypes = {
    config: PropTypes.object
}

Canvas.defaultProps = {
    config: {
        xCount:100,
        yCount: 100,
        cellTypes: []
    }
}

export default Canvas