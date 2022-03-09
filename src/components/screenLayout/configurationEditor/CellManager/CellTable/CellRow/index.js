import React from 'react';
import { Table, Checkbox, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import CellIdInput from "../CellIdInput";
import CellNameInput from "../CellNameInput";
import CellColorPicker from "../CellColorPicker";
import CellSpawnChanceInput from "../CellSpawnChanceInput";

const CellRow = ({ cells, setCells, index, cell, ...props }) => {

    const setCellProp = (property, value) => {
        let newCells = [...cells];
        newCells[index][property] = value;
        setCells(newCells);
    };

    const getPropChangeHandler = (prop) => {
        return (value) => setCellProp(prop, value);
    }

    const removeCurrentCell = () => {
        let newCells = [...cells];
        newCells.splice(index,1);
        setCells(newCells);
    }

    return <Table.Row
        {...props}
    >
        <Table.Cell collapsing>
            <CellIdInput
                index={index}
                cellId={cell.id}
                setCellId={getPropChangeHandler('id')}
            />
        </Table.Cell>
        <Table.Cell collapsing>
            <CellNameInput
                index={index}
                cellName={cell.name}
                setCellName={getPropChangeHandler('name')}
            />
        </Table.Cell>
        <Table.Cell collapsing textAlign='center'>
            <Checkbox
                index={index}
                checked={cell.solid}
                onChange={(_, data) => setCellProp('solid', data.checked)}
            />
        </Table.Cell>
        <Table.Cell collapsing>
            <CellColorPicker
                index={index}
                name={cell.name}
                color={cell.color}
                setColor={getPropChangeHandler('color')}
            />
        </Table.Cell>
        <Table.Cell collapsing textAlign='left'>
            <CellSpawnChanceInput
                index={index}
                spawnChance={cell.spawnChance}
                setSpawnChance={getPropChangeHandler('spawnChance')}
            />
        </Table.Cell>
        <Table.Cell collapsing textAlign='center'>
            <Button
                compact
                negative
                circular
                size={'tiny'}
                onClick={removeCurrentCell}
                icon={'minus'}
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