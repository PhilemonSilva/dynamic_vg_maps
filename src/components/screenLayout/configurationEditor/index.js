import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react'
import {Wrapper} from "./index.style";


const ConfigurationEditor = ({config, setConfig, isGeneratingMap, setIsGeneratingMap, ...props}) => {
    return <Wrapper {...props}>
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