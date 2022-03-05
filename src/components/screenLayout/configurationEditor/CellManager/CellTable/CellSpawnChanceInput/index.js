import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CellSpawnChanceInput = ({ index, spawnChance, setSpawnChance, ...props }) => {
    return <>
        <Input
            value={spawnChance}
            onChange={(_,{ value}) => setSpawnChance(parseFloat(value))}
            type='number'
            size={"small"}
            step='.01'
            label='%'
            labelPosition={"right"}
            style={{maxWidth: 90}}
        />
    </>

}

CellSpawnChanceInput.propTypes = {
    index: PropTypes.number,
    spawnChance: PropTypes.number,
    setSpawnChance: PropTypes.func
}

CellSpawnChanceInput.defaultProps = {
    index: 0,
    spawnChance: 0,
    setSpawnChance: () => { }
}

export default CellSpawnChanceInput