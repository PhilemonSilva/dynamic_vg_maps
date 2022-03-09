import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'semantic-ui-react'
import InfoIcon from "../../InfoIcon";
import CellRow from "./CellRow";
import sum from '../../../../../util/array'
import './index.style.css';
import PropTypes from 'prop-types';

const CellTable = ({ cells, setCells, ...props }) => {

    const [cellRows, setCellRows] = useState([]);
    const [solidCellsAreValid, setSolidCellsAreValid] = useState(false);
    const [nonSolidCellsAreValid, setNonSolidCellsAreValid] = useState(false);

    const validateCells = useCallback(() => {
        let solidSpawnSum = sum(cells.filter(c => c.solid), 'spawnChance');
        let nonSolidSpawnSum = sum(cells.filter(c => !c.solid), 'spawnChance');
        setSolidCellsAreValid( (solidSpawnSum === 100));
        setNonSolidCellsAreValid((nonSolidSpawnSum === 100));
    }, [JSON.stringify(cells)]);
    useEffect(() => {
        validateCells();
    }, [validateCells])

    const rowHasWarning = (cell) => {
        return (cell.solid && !solidCellsAreValid)
            || ((!cell.solid) && !nonSolidCellsAreValid)
    }

    const generateCellRows = useCallback(()=> {
        setCellRows(
            cells.map((cell, i) => {
                return <CellRow
                    key={i}
                    index={i}
                    warning={rowHasWarning(cell)}
                    cells={cells}
                    setCells={setCells}
                    cell={cell}
                />
            })
        );

    }, [JSON.stringify(cells), solidCellsAreValid, nonSolidCellsAreValid]);
    useEffect(()=>{
        generateCellRows();
    }, [generateCellRows])

    return <Table
        celled
        collapsing
        striped
        size='small'
        {...props}
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
                <Table.HeaderCell className='no-line-break'>
                    <InfoIcon
                        text={'Add or remove cells'}
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