import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CellIdInput = ({ index, cellId, setCellId, ...props }) => {
    return <>
        <Input
            value={cellId}
            onChange={(_,{ value}) => {setCellId(parseInt(value))}}
            size={"small"}
            type='number'
            style={{maxWidth: 80}}
            {...props}
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