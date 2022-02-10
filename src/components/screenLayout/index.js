import React, { useEffect, useState, useCallback } from 'react'
import Canvas from "../canvas";
import {log, logImportant} from "../../loggers/InternalLogger";

const logConfiguration = (config) => {
    log(`Configuration update: `);
    log(`\txCount: ${config.xCount}`);
    log(`\tyCount: ${config.yCount}`);
    log(`\tSeed: ${config.seed}`);
    log(`\tFill: ${config.fill}`);
    log(`\tAmount of Cell Types: ${config.cellTypes.length}`);
}

const ScreenLayout = () => {
    const [config, setConfig] = useState(require('../../configs/vgConfig.json'))

    useEffect(()=>{
        logImportant('Initialized');
    }, [])

    const logConfigUpdate = useCallback(()=>{
        logConfiguration(config);
    }, [config])
    useEffect(() => {
        logConfigUpdate()
    },[logConfigUpdate])

    return <>
        <Canvas config={config}/>
    </>
}

export default ScreenLayout