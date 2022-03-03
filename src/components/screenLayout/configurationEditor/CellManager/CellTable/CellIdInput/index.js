import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CellIdInput = ({ index, cellId, setCellId, ...props }) => {
    return <>
        <Input
            style={{maxWidth: 80}}
            type='number'
            value={cellId}
            onChange={(_,{ value}) => {setCellId(index, parseInt(value))}}
        />
    </>

}

CellIdInput.propTypes = {
    index: PropTypes.number,
    cellId: PropTypes.number,
    setCellId: PropTypes.func
}

CellIdInput.defaultProps = {
    index: 0,
    cellId: 0,
    setCellId: () => { }
}

export default CellIdInput