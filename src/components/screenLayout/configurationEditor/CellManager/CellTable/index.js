import React, { useState, useEffect, useCallback } from 'react';
import { Table, Input, Checkbox } from 'semantic-ui-react'
import CellIdInput from "./CellIdInput";
import CellNameInput from "./CellNameInput";
import CellSpawnChanceInput from "./CellSpawnChanceInput";
import InfoIcon from "../../InfoIcon";
import CellColorPicker from "./CellColorPicker";
import './index.style.css';
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
                    <Table.Cell collapsing>
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
                    <Table.Cell collapsing>
                        <CellColorPicker
                            index={i}
                            name={cell.name}
                            color={cell.color}
                            setColor={setCellColor}
                        />
                    </Table.Cell>
                    <Table.Cell collapsing textAlign='left'>
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

    return <Table
        celled
        collapsing
        striped
        size='small'
    >
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell className='no-line-break'>
                    Id
                    <InfoIcon
                        text={'The unique identifier of the cell. Useful for exporting the data'}
                    />
                </Table.HeaderCell>
                <Table.HeaderCell className='no-line-break'>
                    Name
                    <InfoIcon
                        text={'The descriptor of the cell. Useful for exporting the data'}
                    />
                </Table.HeaderCell>
                <Table.HeaderCell className='no-line-break'>
                    Solid
                    <InfoIcon
                        text={'Identifies the cell as a solid cell (generated as the walls of the map)' +
                        ' or a non-solid cell (generated as the path)'}
                    />
                </Table.HeaderCell>
                <Table.HeaderCell className='no-line-break'>
                    Color
                    <InfoIcon
                        text={'Color displayed for the cell on the Dynamic VG Maps editor.'}
                    />
                </Table.HeaderCell>
                <Table.HeaderCell className='no-line-break'>
                    Spawn Chance (%)
                    <InfoIcon
                        text={'Chance of the cell spawn. ' +
                        'The sum of the solid cell spawns must be 100%, ' +
                        'the same also goes for the non-solid cells '}
                    />
                </Table.HeaderCell>
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