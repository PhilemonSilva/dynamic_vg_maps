import React from 'react';
import { Input, Label } from 'semantic-ui-react'
import InfoIcon from "../InfoIcon";
import PropTypes from 'prop-types';

const FillInput = ({ fill, setFill, ...props }) => {
    return <>
        <Input
            value={fill}
            error={!fill}
            onChange={(_,{ value}) => setFill(value)}
            labelPosition='right'
            type='number'
            step=".01"
            placeholder='40.00'
            {...props}
        >
            <Label basic>Fill:</Label>
            <input style={{maxWidth: 90}}/>
            <Label>%</Label>
        </Input>
        <InfoIcon
            text={'The percentage of solid cell spawns. ' +
            'If at 100%, rooms will always be completely composed of solid cells.'}
        />
    </>

}

FillInput.propTypes = {
    fill: PropTypes.number,
    setFill: PropTypes.func
}

FillInput.defaultProps = {
    fill: 40,
    setFill: () => { }
}

export default FillInput