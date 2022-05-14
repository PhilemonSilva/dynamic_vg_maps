import React from 'react';
import { Input, Label } from 'semantic-ui-react'
import InfoIcon from "../../InfoIcon";
import PropTypes from 'prop-types';

const DeadEndSpawnChanceInput = ({ deadEndSpawnChance, setDeadEndSpawnChance, ...props }) => {
    return <>
        <Input
            value={deadEndSpawnChance}
            onChange={(_,{ value}) => setDeadEndSpawnChance(value)}
            labelPosition='right'
            type='number'
            placeholder='50...'
            {...props}
        >
            <Label>Dead End Chance:</Label>
            <input style={{maxWidth: 80}}/>
            <Label>%</Label>
        </Input>
        <InfoIcon
            text={'Chance of spawning rooms that do not belong to the main path of the map.'}
        />
    </>

}

DeadEndSpawnChanceInput.propTypes = {
    deadEndSpawnChance: PropTypes.number,
    setDeadEndSpawnChance: PropTypes.func
}

DeadEndSpawnChanceInput.defaultProps = {
    mapDimension: 40,
    setMapDimension: () => { }
}

export default DeadEndSpawnChanceInput