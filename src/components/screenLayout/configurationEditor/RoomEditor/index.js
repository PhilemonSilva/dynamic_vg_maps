import React from 'react';
import PropTypes from 'prop-types';
import WallWidthInput from "./WallWidthInput";
import DeadEndSpawnChanceInput from "./DeadEndSpawnChanceInput";
import {InputElement, FormRow} from "../index.style";

const RoomEditor = ({config, setConfig, isGeneratingMap, ...props}) => {
    const setDeadEndSpawnChance= (deadEndSpawnChance) => setConfig(prevState => {return {...prevState, deadEndSpawnChance: deadEndSpawnChance}});
    const setWallWidth = (width) => setConfig(prevState => {return {...prevState, roomWallMinimumWidth: width }});

    return <FormRow {...props}>
        <InputElement>
            <DeadEndSpawnChanceInput
                deadEndSpawnChance={config.deadEndSpawnChance}
                setDeadEndSpawnChance={setDeadEndSpawnChance}
                disabled={isGeneratingMap}
            />
        </InputElement>
        <InputElement>
            <WallWidthInput
                wallWidth={config.roomWallMinimumWidth}
                setWallWidth={setWallWidth}
                disabled={isGeneratingMap}
            />
        </InputElement>
    </FormRow>
}

RoomEditor.propTypes = {
    config: PropTypes.object,
    setConfig: PropTypes.func,
    isGeneratingMap: PropTypes.bool
}

RoomEditor.defaultProps = {
    config: {},
    setConfig: () => { },
    isGeneratingMap: false
}

export default RoomEditor;