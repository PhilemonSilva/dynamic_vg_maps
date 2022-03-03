import React, { useState, useEffect, useCallback } from 'react';
import { Table, Input, Checkbox } from 'semantic-ui-react'
import CellIdInput from "./CellIdInput";
import CellNameInput from "./CellNameInput";
import CellSpawnChanceInput from "./CellSpawnChanceInput";
import PropTypes from 'prop-types';

const CellTable = ({ cells, setCells, ...props }) => {

    const [cellRows, setCellRows] = useState([]);

    const generateCellRows = useCallback(()=> {
        setCellRows(
            cells.map(cell => {
                return <Table.Row>
                    <Table.Cell collapsing>
                        <CellIdInput
                            cellId={cell.id}
                            setCellId={()=>{ }}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <CellNameInput
                            cellName={cell.name}
                            setCellName={() => { }}
                        />
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <Checkbox
                            checked={cell.solid}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        {cell.color}
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <CellSpawnChanceInput
                            spawnChance={cell.spawnChance}
                        />
                    </Table.Cell>
                </Table.Row>
            })
        );

    }, [JSON.stringify(cells)]);
    useEffect(()=>{
        generateCellRows();
    }, [generateCellRows])

    return <Table celled striped>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Solid</Table.HeaderCell>
                <Table.HeaderCell>Color</Table.HeaderCell>
                <Table.HeaderCell>Spawn Chance (%)</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {cellRows}
        </Table.Body>
    </Table>
}

CellTable.propTypes = {
    cells: PropTypes.array,
    setCells: PropTypes.func
}

CellTable.defaultProps = {
    cells: [],
    setCells: () => { }
}

export default CellTable