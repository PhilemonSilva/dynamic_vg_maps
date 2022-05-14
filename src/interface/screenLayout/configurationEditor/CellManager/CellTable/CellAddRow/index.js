import React, {useCallback, useState} from 'react';
import { Table, Checkbox, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import CellIdInput from "../CellIdInput";
import CellNameInput from "../CellNameInput";
import CellColorPicker from "../CellColorPicker";
import CellSpawnChanceInput from "../CellSpawnChanceInput";

const CellAddRow = ({ cells, setCells, ...props }) => {

    const [cell, setCell] = useState({ solid: false, color: '#808080' })

    const getPropChangeHandler = (prop) => {
        return (value) => setCell(prevState => {
            let newState = {...prevState}
            newState[prop] = value;
            return newState
        })
    }

    const addCell = useCallback(() => {
        let newCells = [...cells];
        newCells.push(cell);
        setCells(newCells);
        setCell({solid: false, color: '#808080'})
    }, [cells, cell, setCells]);

    return <Table.Row

        style={{backgroundColor: '#D3D3D3'}}
        {...props}
    >
        <Table.Cell collapsing>
            <CellIdInput
                cellId={cell.id}
                setCellId={getPropChangeHandler('id')}
            />
        </Table.Cell>
        <Table.Cell collapsing>
            <CellNameInput
                cellName={cell.name}
                setCellName={getPropChangeHandler('name')}
            />
        </Table.Cell>
        <Table.Cell collapsing textAlign='center'>
            <Checkbox
                checked={cell.solid}
                onChange={(_, data) => setCell(prevState => {
                    let newState = {...prevState}
                    newState['solid'] = data.checked;
                    return newState
                })}
            />
        </Table.Cell>
        <Table.Cell collapsing>
            <CellColorPicker
                name={cell.name}
                color={cell.color}
                setColor={getPropChangeHandler('color')}
            />
        </Table.Cell>
        <Table.Cell collapsing textAlign='left'>
            <CellSpawnChanceInput
                spawnChance={cell.spawnChance}
                setSpawnChance={getPropChangeHandler('spawnChance')}
            />
        </Table.Cell>
        <Table.Cell collapsing textAlign='center'>
            <Button
                compact
                primary
                circular
                size={'tiny'}
                onClick={addCell}
                icon={'plus'}
            />
        </Table.Cell>
    </Table.Row>
}

CellAddRow.propTypes = {
    cells: PropTypes.array,
    setCells: PropTypes.func
}

CellAddRow.defaultProps = {
    cells: [],
    setCells: () => { }
}

export default CellAddRow