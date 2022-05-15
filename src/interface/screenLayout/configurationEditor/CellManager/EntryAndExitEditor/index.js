import React from 'react';
import PropTypes from 'prop-types';
import {InputElement, FormRow} from "../../index.style";
import CellInput from "./CellInput";

const EntryAndExitEditor = ({config, setConfig, isGeneratingMap, ...props}) => {
    const setEntryCell = (cell) => setConfig(prevState => {return {...prevState, entryCell: cell}});
    const setExitCell = (cell) => setConfig(prevState => {return {...prevState, exitCell: cell}});

    return <FormRow {...props}>
        <InputElement>
            <CellInput
                label={'Entry'}
                cell={config.entryCell}
                setCell={setEntryCell}
                infoText={'Entry cell name and color. The Id of the entry cell is always "-1". ' +
                    'The color will only be updated on the next run.'}
            />
        </InputElement>
        <InputElement>
            <CellInput
                label={'Exit'}
                cell={config.exitCell}
                setCell={setExitCell}
                infoText={'Exit cell name and color. The Id of the entry cell is always "-2". ' +
                    'The color will only be updated on the next run.'}
            />
        </InputElement>
    </FormRow>
}

EntryAndExitEditor.propTypes = {
    config: PropTypes.object,
    setConfig: PropTypes.func,
    isGeneratingMap: PropTypes.bool
}

EntryAndExitEditor.defaultProps = {
    config: {},
    setConfig: () => { },
    isGeneratingMap: false
}

export default EntryAndExitEditor;