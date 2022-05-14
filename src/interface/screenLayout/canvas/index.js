import React, {useCallback, useEffect, useState} from 'react'
import useCanvas from "./canvasManager";
import generateMap from "../../../scripts/mapGenerator";
import PropTypes from 'prop-types';

const Canvas = ({ config, isGeneratingMap, setIsGeneratingMap, ...props}) => {

    const [map, setMap]  = useState([[]]);

    const generateNewMap = useCallback(()=>{
        if(isGeneratingMap){
            setMap(generateMap(config));
            setIsGeneratingMap(false);
        }
    }, [config, isGeneratingMap, setIsGeneratingMap])
    useEffect(()=>{
        generateNewMap();
    }, [generateNewMap])

    const draw = useCallback((context, cellSide) => {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                let x = j * cellSide;
                let y = i * cellSide;
                context.beginPath();
                context.fillStyle = map[i][j].color;
                context.fillRect(x, y, cellSide, cellSide);
            }
        }
    },[ [JSON.stringify(map)]])

    const canvasRef = useCanvas(config, draw);

    return <canvas
        ref={canvasRef}
        style={{
            width: '60%',
            height: '85%',
            border: '1px solid #000000'}}
        {...props}
    />
}

Canvas.propTypes = {
    config: PropTypes.object,
    isGeneratingMap: PropTypes.bool,
    setIsGeneratingMap: PropTypes.func
}

Canvas.defaultProps = {
    config: {
        mapDimension: 100,
        roomWallMinimumWidth: 2,
        fill: 40,
        roomsPerRow: 5,
        deadEndSpawnChance: 50,
        pathWidth: 3,
        organicPaths: true,
        cellTypes: []
    },
    isGeneratingMap: false,
    setIsGeneratingMap: () => { }
}

export default Canvas