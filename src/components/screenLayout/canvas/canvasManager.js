import { useRef, useEffect } from "react";

const useCanvas = (config, draw) => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.height = canvas.width;
        let cellSide = canvas.width / Math.max(config.xCount, config.yCount);
        const context = canvas.getContext('2d');

        draw(context, cellSide)
    }, [ config.xCount, config.yCount, draw ])

    return canvasRef
}

export default useCanvas