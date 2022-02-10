import React, { useEffect } from 'react'
import Canvas from "../canvas";
import {log} from "../../loggers/InternalLogger";

const ScreenLayout = () => {
    useEffect(()=>{
        log('Initialized');
    }, [])

    return <>
        <Canvas/>
    </>
}

export default ScreenLayout