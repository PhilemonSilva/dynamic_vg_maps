import React from 'react';
import { Input, Label } from 'semantic-ui-react'
import InfoIcon from "../../InfoIcon";
import PropTypes from 'prop-types';

const MapDimensionInput = ({ mapDimension, setMapDimension, ...props }) => {
    return <>
        <Input
            value={mapDimension}
            onChange={(_,{ value}) => setMapDimension(parseInt(value))}
            labelPosition='right'
            type='number'
            placeholder='100...'
            {...props}
        >
            <Label>Map Dimension:</Label>
            <input style={{maxWidth: 70}}/>
            <Label>x{mapDimension}</Label>
        </Input>
        <InfoIcon
            text={'The amount of cells in the sides of the map. Inputting "100" will generate a 100x100 grid of cells.'}
        />
    </>

}

MapDimensionInput.propTypes = {
    mapDimension: PropTypes.number,
    setMapDimension: PropTypes.func
}

MapDimensionInput.defaultProps = {
    mapDimension: 40,
    setMapDimension: () => { }
}

export default MapDimensionInput