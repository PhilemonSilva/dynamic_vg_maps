import { useRef, useEffect } from "react";

const useCanvas = (config, draw) => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.height = canvas.width;
        let cellSide = canvas.width / config.mapDimension;
        const context = canvas.getContext('2d');

        draw(context, cellSide)
    }, [ config.mapDimension, draw ])

    return canvasRef
}

export default useCanvas