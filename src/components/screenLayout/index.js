import React, {useEffect, useState, useCallback} from 'react';
import {log, logImportant} from "../../loggers/InternalLogger";

import Canvas from "./canvas";
import ConfigurationEditor from "./configurationEditor";

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
    const [isGeneratingMap, setIsGeneratingMap] = useState(true);

    useEffect(() => {
        logImportant('Initialized');
    }, [])

    const logConfigUpdate = useCallback(() => {
        logConfiguration(config);
    }, [config])
    useEffect(() => {
        logConfigUpdate()
    }, [logConfigUpdate])

    //TODO: Validation rule: wallWidth must be < xCount and yCount
    return <>
        <Canvas
            config={config}
            isGeneratingMap={isGeneratingMap}
            setIsGeneratingMap={setIsGeneratingMap}
        />
        <ConfigurationEditor
            config={config}
            setConfig={setConfig}
            isGeneratingMap={isGeneratingMap}
            setIsGeneratingMap={setIsGeneratingMap}
        />
    </>
}

export default ScreenLayout