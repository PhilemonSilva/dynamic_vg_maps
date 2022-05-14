import React from 'react';
import { Segment } from 'semantic-ui-react';
import CellTable from "./CellTable";
import PropTypes from 'prop-types';

const CellManager = ({ cells, setCells, ...props }) => {

    return <>
        <Segment color='blue' {...props}>
            <h4>Cells</h4>
            <CellTable
                cells={cells}
                setCells={setCells}
            />
        </Segment>
    </>

}

CellManager.propTypes = {
    cells: PropTypes.array,
    setCells: PropTypes.func
}

CellManager.defaultProps = {
    cells: [],
    setCells: () => { }
}

export default CellManager