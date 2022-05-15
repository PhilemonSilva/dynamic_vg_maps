import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CellNameInput = ({cellName, setCellName, label, ...props }) => {
    return label ?
        <>
            <Input
                value={cellName}
                onChange={(_,{ value}) => setCellName(value)}
                placeholder='cell_name...'
                label={label}
                size={"mini"}
                {...props}
            />
        </>
        :
        <>
            <Input
                value={cellName}
                onChange={(_,{ value}) => setCellName(value)}
                placeholder='cell_name...'
                size={"small"}
                {...props}
            />
        </>

}

CellNameInput.propTypes = {
    cellName: PropTypes.string,
    setCellName: PropTypes.func,
    label: PropTypes.string
}

CellNameInput.defaultProps = {
    cellName: 'no_name',
    setCellName: () => { },
    label: ''
}

export default CellNameInput