import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CellIdInput = ({ cellId, setCellId, ...props }) => {
    return <>
        <Input
            style={{maxWidth: 80}}
            type='number'
            value={cellId}
            onChange={(_,{ value}) => setCellId(value)}
        />
    </>

}

CellIdInput.propTypes = {
    cellId: PropTypes.number,
    setCellId: PropTypes.func
}

CellIdInput.defaultProps = {
    cellId: 0,
    setCellId: () => { }
}

export default CellIdInput