import { useRef, useEffect } from "react";

const useCanvas = (draw) => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 600;
        canvas.height = 600;
        const context = canvas.getContext('2d');

        draw(context)
    }, [ draw ])

    return canvasRef
}

export default useCanvas