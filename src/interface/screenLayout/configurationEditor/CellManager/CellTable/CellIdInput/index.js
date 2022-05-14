import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CellIdInput = ({cellId, setCellId, ...props }) => {
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
    cellId: PropTypes.number,
    setCellId: PropTypes.func
}

CellIdInput.defaultProps = {
    cellId: 0,
    setCellId: () => { }
}

export default CellIdInput