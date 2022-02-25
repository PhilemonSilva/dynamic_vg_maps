import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react'
import SeedInput from "./SeedInput";
import WallWidthInput from "./WallWidthInput";
import {Wrapper, InputElement} from "./index.style";


const ConfigurationEditor = ({config, setConfig, isGeneratingMap, setIsGeneratingMap, ...props}) => {

    const setSeed = (seed) => setConfig(prevState => {return {...prevState, seed: seed }});
    const setFill = (seed) => setConfig(prevState => {return {...prevState, fill: seed }});
    const setWallWidth = (width) => setConfig(prevState => {return {...prevState, roomWallMinimumWidth: width }});

    return <Wrapper {...props}>
        <InputElement>
            <SeedInput
                seed={config.seed}
                setSeed={setSeed}
            />
        </InputElement>
        <InputElement>
            <WallWidthInput
                wallWidth={config.roomWallMinimumWidth}
                setWallWidth={setWallWidth}
            />
        </InputElement>
        <Button
            positive
            onClick={() => setIsGeneratingMap(true)}
            loading={isGeneratingMap}
        >
            RUN
        </Button>
    </Wrapper>
}

ConfigurationEditor.propTypes = {
    config: PropTypes.object,
    setConfig: PropTypes.func,
    isGeneratingMap: PropTypes.bool,
    setIsGeneratingMap: PropTypes.func
}

ConfigurationEditor.defaultProps = {
    config: {
        xCount:100,
        yCount: 100,
        roomWallMinimumWidth: 2,
        fill: 40,
        cellTypes: []
    },
    setConfig: () => { },
    isGeneratingMap: false,
    setIsGeneratingMap: () => { }
}

export default ConfigurationEditor;