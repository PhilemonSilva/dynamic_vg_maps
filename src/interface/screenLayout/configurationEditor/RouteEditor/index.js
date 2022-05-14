import React from 'react';
import PropTypes from 'prop-types';
import PathWidthInput from "./PathWidthInput";
import OrganicPathsCheckbox from "./OrganicPathsCheckbox";
import {InputElement, FormRow} from "../index.style";
import FillInput from "./FillInput";

const RouteEditor = ({config, setConfig, isGeneratingMap, ...props}) => {
    const setOrganicPaths = (organicPaths) => setConfig(prevState => {return {...prevState, organicPaths: organicPaths}});
    const setPathWidth = (width) => setConfig(prevState => {return {...prevState, pathWidth: width}});
    const setFill = (fill) => setConfig(prevState => {return {...prevState, fill: fill }});

    return <FormRow {...props}>
        <InputElement>
            <FillInput
                fill={config.fill}
                setFill={setFill}
                disabled={isGeneratingMap}
            />
        </InputElement>
        <InputElement>
            <PathWidthInput
                pathWidth={config.pathWidth}
                setPathWidth={setPathWidth}
                disabled={isGeneratingMap}
            />
        </InputElement>
        <InputElement>
            <OrganicPathsCheckbox
                organicPaths={config.organicPaths}
                setOrganicPaths={setOrganicPaths}
                disabled={isGeneratingMap}
            />
        </InputElement>
    </FormRow>
}

RouteEditor.propTypes = {
    config: PropTypes.object,
    setConfig: PropTypes.func,
    isGeneratingMap: PropTypes.bool
}

RouteEditor.defaultProps = {
    config: {},
    setConfig: () => { },
    isGeneratingMap: false
}

export default RouteEditor;