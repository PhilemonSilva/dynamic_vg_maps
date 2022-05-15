import React from 'react';
import { Segment } from 'semantic-ui-react';
import CellTable from "./CellTable";
import EntryAndExitEditor from "./EntryAndExitEditor";
import PropTypes from 'prop-types';

const CellManager = ({ cells, setCells, config, setConfig, ...props }) => {

    return <>
        <Segment color='blue' {...props}>
            <h4>Cells: </h4>
            <CellTable
                cells={cells}
                setCells={setCells}
            />
            <EntryAndExitEditor
                config={config}
                setConfig={setConfig}
            />
        </Segment>
    </>

}

CellManager.propTypes = {
    cells: PropTypes.array,
    setCells: PropTypes.func,
    config: PropTypes.object,
    setConfig: PropTypes.func
}

CellManager.defaultProps = {
    cells: [],
    setCells: () => { },
    config: {},
    setConfig: {}
}

export default CellManager