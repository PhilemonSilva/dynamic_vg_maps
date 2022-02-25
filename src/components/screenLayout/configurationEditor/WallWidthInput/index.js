import React from 'react';
import { Input, Label } from 'semantic-ui-react'
import InfoIcon from "../InfoIcon";
import PropTypes from 'prop-types';

const WallWidthInput = ({ wallWidth, setWallWidth, ...props }) => {
    //TODO: Warn about wall = 1 problem
    return <>
        <Input
            value={wallWidth}
            onChange={(_,{ value}) => setWallWidth(value)}
            labelPosition='right'
            type='number'
            placeholder='2'
            {...props}
        >
            <Label basic>Min. Wall Width:</Label>
            <input style={{maxWidth: 70}}/>
            <Label>Cells</Label>
        </Input>
        <InfoIcon
            text={'Determines the minimum Width of the Walls in each room.'}
        />
    </>

}

WallWidthInput.propTypes = {
    wallWidth: PropTypes.number,
    setWallWidth: PropTypes.func
}

WallWidthInput.defaultProps = {
    wallWidth: 2,
    setWallWidth: () => { }
}

export default WallWidthInput