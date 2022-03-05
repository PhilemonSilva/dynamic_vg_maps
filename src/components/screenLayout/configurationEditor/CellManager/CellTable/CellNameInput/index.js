import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CellNameInput = ({ index, cellName, setCellName, ...props }) => {
    return <>
        <Input
            value={cellName}
            onChange={(_,{ value}) => setCellName(value)}
            placeholder='wall...'
            size={"small"}
            {...props}
        />
    </>

}

CellNameInput.propTypes = {
    index: PropTypes.number,
    cellName: PropTypes.string,
    setCellName: PropTypes.func
}

CellNameInput.defaultProps = {
    index: 0,
    cellName: 'no_name',
    setCellName: () => { }
}

export default CellNameInput