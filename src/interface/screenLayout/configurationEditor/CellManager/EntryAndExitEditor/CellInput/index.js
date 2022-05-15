import React from 'react';
import {InputElement, FormRow} from "../../../index.style";
import PropTypes from 'prop-types';
import CellColorPicker from "../../CellTable/CellColorPicker";
import CellNameInput from "../../CellTable/CellNameInput";
import InfoIcon from "../../../InfoIcon";

const CellInput = ({ cell, setCell, label, infoText, ...props }) => {
    const setCellColor = (cellColor) => setCell({...cell, color: cellColor});
    const setCellName = (cellName) => setCell({...cell, name: cellName});

    return <FormRow {...props}>
        <InputElement>
            <CellNameInput
                cellName={cell.name}
                setCellName={setCellName}
                label={label}
            />
        </InputElement>
        <InputElement>
            <CellColorPicker
                name={cell.name}
                color={cell.color}
                setColor={setCellColor}
            />
        </InputElement>
        <InfoIcon text={infoText}/>
    </FormRow>

}

CellInput.propTypes = {
    fill: PropTypes.number,
    setFill: PropTypes.func
}

CellInput.defaultProps = {
    fill: 40,
    setFill: () => { }
}

export default CellInput