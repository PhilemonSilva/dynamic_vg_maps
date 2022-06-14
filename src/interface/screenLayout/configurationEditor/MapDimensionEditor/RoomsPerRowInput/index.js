import React from 'react';
import { Input, Label } from 'semantic-ui-react'
import InfoIcon from "../../InfoIcon";
import PropTypes from 'prop-types';

const RoomsPerRowInput = ({ roomsPerRow, setRoomsPerRow, ...props }) => {
    return <>
        <Input
            value={roomsPerRow}
            onChange={(_,{ value}) => setRoomsPerRow(parseInt(value))}
            labelPosition='right'
            type='number'
            placeholder='5...'
            {...props}
        >
            <Label>Rooms Per Row:</Label>
            <input style={{maxWidth: 70}}/>
            <Label>Rooms</Label>
        </Input>
        <InfoIcon
            text={'Amount of rooms in each row of the map.'}
        />
    </>

}

RoomsPerRowInput.propTypes = {
    roomsPerRow: PropTypes.number,
    setRoomsPerRow: PropTypes.func
}

RoomsPerRowInput.defaultProps = {
    roomsPerRow: 40,
    setRoomsPerRow: () => { }
}

export default RoomsPerRowInput