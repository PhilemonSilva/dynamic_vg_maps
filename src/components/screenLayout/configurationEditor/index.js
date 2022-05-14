import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react'
import RoomEditor from "./RoomEditor";
import CellManager from "./CellManager";
import RouteEditor from "./RouteEditor";
import MapDimensionEditor from "./MapDimensionEditor";
import {Wrapper, InputElement} from "./index.style";
import SeedInput from "./SeedInput";


const ConfigurationEditor = ({config, setConfig, isGeneratingMap, setIsGeneratingMap, ...props}) => {

    const setSeed = (seed) => setConfig(prevState => {return {...prevState, seed: seed }});
    const setCells = (cells) => setConfig(prevState => {return {...prevState, cellTypes: cells}})

    return <Wrapper {...props}>
        <InputElement>
            <SeedInput
                seed={config.seed}
                setSeed={setSeed}
                isGeneratingMap={isGeneratingMap}
                disabled={isGeneratingMap}
            />
        </InputElement>
        <RouteEditor
            config={config}
            setConfig={setConfig}
            isGeneratingMap={isGeneratingMap}
        />
        <MapDimensionEditor
            config={config}
            setConfig={setConfig}
            isGeneratingMap={isGeneratingMap}
        />
        <RoomEditor
            config={config}
            setConfig={setConfig}
            isGeneratingMap={isGeneratingMap}
        />
        <InputElement>
            <CellManager
                cells={config.cellTypes}
                setCells={setCells}
                disabled={isGeneratingMap}
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
        mapDimension: 100,
        roomWallMinimumWidth: 2,
        fill: 40,
        roomsPerRow: 5,
        deadEndSpawnChance: 50,
        pathWidth: 2,
        organicPaths: true,
        cellTypes: []
    },
    setConfig: () => { },
    isGeneratingMap: false,
    setIsGeneratingMap: () => { }
}

export default ConfigurationEditor;