import React from 'react';
import {Popup, Icon, Table, Checkbox} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import CellIdInput from "../CellIdInput";
import CellNameInput from "../CellNameInput";
import CellColorPicker from "../CellColorPicker";
import CellSpawnChanceInput from "../CellSpawnChanceInput";

const CellRow = ({ cells, setCells, index, cell, ...props }) => {

    const setCellProp = (index, property, value) => {
        let newCells = [...cells];
        newCells[index][property] = value;
        setCells(newCells);
    };

    return <Table.Row {...props}>
        <Table.Cell collapsing>
            <CellIdInput
                index={index}
                cellId={cell.id}
                setCellId={value => setCellProp(index, 'id', value)}
            />
        </Table.Cell>
        <Table.Cell collapsing>
            <CellNameInput
                index={index}
                cellName={cell.name}
                setCellName={value => setCellProp(index, 'name', value)}
            />
        </Table.Cell>
        <Table.Cell collapsing textAlign='center'>
            <Checkbox
                index={index}
                checked={cell.solid}
            />
        </Table.Cell>
        <Table.Cell collapsing>
            <CellColorPicker
                index={index}
                name={cell.name}
                color={cell.color}
                setColor={value => setCellProp(index, 'color', value)}
            />
        </Table.Cell>
        <Table.Cell collapsing textAlign='left'>
            <CellSpawnChanceInput
                index={index}
                spawnChance={cell.spawnChance}
                setSpawnChance={value => setCellProp(index, 'spawnChance', value)}
            />
        </Table.Cell>
    </Table.Row>
}

CellRow.propTypes = {
    cells: PropTypes.array,
    setCells: PropTypes.func,
    cell: PropTypes.object,
    index: PropTypes.number
}

CellRow.defaultProps = {
    cells: [],
    setCells: () => { },
    cell: { },
    index: 0
}

export default CellRow