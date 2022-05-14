import React, {useEffect, useState, useCallback} from 'react';
import {logConfiguration, logImportant} from "../../loggers/InternalLogger";

import Canvas from "./canvas";
import ConfigurationEditor from "./configurationEditor";

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

    //TODO: Validation rule: wallWidth must be < mapDimension
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