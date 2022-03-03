import React, { useState, useEffect, useCallback } from 'react';
import { Table, Input, Checkbox } from 'semantic-ui-react'
import CellIdInput from "./CellIdInput";
import CellNameInput from "./CellNameInput";
import CellSpawnChanceInput from "./CellSpawnChanceInput";
import PropTypes from 'prop-types';

const CellTable = ({ cells, setCells, ...props }) => {

    const [cellRows, setCellRows] = useState([]);

    const setCellId = (index, id) => {
        let newCells = [...cells];
        newCells[index] = { ...newCells[index], id: id};
        setCells(newCells);
    };

    const setCellName = (index, name) => {
        let newCells = [...cells];
        newCells[index] = { ...newCells[index], name: name};
        setCells(newCells);
    };

    const setCellColor = (index, color) => {
        let newCells = [...cells];
        newCells[index] = { ...newCells[index], color: color};
        setCells(newCells);
    };

    const setCellSpawnChance = (index, spawnChance) => {
        let newCells = [...cells];
        newCells[index] = { ...newCells[index], spawnChance: spawnChance};
        setCells(newCells);
    };


    const generateCellRows = useCallback(()=> {
        setCellRows(
            cells.map((cell, i) => {
                return <Table.Row>
                    <Table.Cell collapsing>
                        <CellIdInput
                            index={i}
                            cellId={cell.id}
                            setCellId={setCellId}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <CellNameInput
                            index={i}
                            cellName={cell.name}
                            setCellName={setCellName}
                        />
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <Checkbox
                            index={i}
                            checked={cell.solid}
                        />
                    </Table.Cell>
                    <Table.Cell>
                        {cell.color}
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <CellSpawnChanceInput
                            index={i}
                            spawnChance={cell.spawnChance}
                            setSpawnChance={setCellSpawnChance}
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