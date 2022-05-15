import React from 'react';
import PropTypes from 'prop-types';
import RoomsPerRowInput from "./RoomsPerRowInput";
import MapDimensionInput from "./MapDimensionInput";
import {InputElement, FormRow} from "../index.style";

const MapDimensionEditor = ({config, setConfig, isGeneratingMap, ...props}) => {
    const setMapDimension= (mapDimension) => setConfig(prevState => {return {...prevState, mapDimension: mapDimension}});
    const setRoomsPerRow = (roomsPerRow) => setConfig(prevState => {return {...prevState, roomsPerRow: roomsPerRow}});

    return <FormRow {...props}>
        <InputElement>
            <MapDimensionInput
                mapDimension={config.mapDimension}
                setMapDimension={setMapDimension}
                disabled={isGeneratingMap}
            />
        </InputElement>
        <InputElement>
            <RoomsPerRowInput
                roomsPerRow={config.roomsPerRow}
                setRoomsPerRow={setRoomsPerRow}
                disabled={isGeneratingMap}
            />
        </InputElement>
    </FormRow>
}

MapDimensionEditor.propTypes = {
    config: PropTypes.object,
    setConfig: PropTypes.func,
    isGeneratingMap: PropTypes.bool
}

MapDimensionEditor.defaultProps = {
    config: {},
    setConfig: () => { },
    isGeneratingMap: false
}

export default MapDimensionEditor;