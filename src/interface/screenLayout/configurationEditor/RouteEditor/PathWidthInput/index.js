import React from 'react';
import { Input, Label } from 'semantic-ui-react'
import InfoIcon from "../../InfoIcon";
import PropTypes from 'prop-types';

const PathWidthInput = ({ pathWidth, setPathWidth, ...props }) => {
    return <>
        <Input
            value={pathWidth}
            onChange={(_,{ value}) => setPathWidth(value)}
            labelPosition='right'
            type='number'
            placeholder='3...'
            {...props}
        >
            <Label>Path Width:</Label>
            <input style={{maxWidth: 70}}/>
            <Label>Cells</Label>
        </Input>
        <InfoIcon
            text={'The width of the path trough the map. The path connects the entry to the exit of the map'}
        />
    </>

}

PathWidthInput.propTypes = {
    pathWidth: PropTypes.number,
    setPathWidth: PropTypes.func
}

PathWidthInput.defaultProps = {
    pathWidth: 40,
    setPathWidth: () => { }
}

export default PathWidthInput