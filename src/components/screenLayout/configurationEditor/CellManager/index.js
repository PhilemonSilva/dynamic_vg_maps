import React, { useState, useEffect, useCallback } from 'react';
import { Accordion } from 'semantic-ui-react';
import CellTable from "./CellTable";
import PropTypes from 'prop-types';

const CellManager = ({ cells, setCells, ...props }) => {

    const [cellRows, setCellRows] = useState([]);

    const generateCellRows = useCallback(()=> {
        let cellRows = [];
        setCellRows()

    }, [JSON.stringify(cells)]);
    useEffect(()=>{
        generateCellRows();
    }, [generateCellRows])



    const Level1Content = (
        <CellTable/>
    );

    return <Accordion
        styled
        fluid
        defaultActiveIndex={0}
        panels={
            [{
                key: 'panel-1',
                title: 'Cells',
                content: {
                    content: Level1Content
                }
            }]
        }
        style={{width: '100%'}}
    />

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