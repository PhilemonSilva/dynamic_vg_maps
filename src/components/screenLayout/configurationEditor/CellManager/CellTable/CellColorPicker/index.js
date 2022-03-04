import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { HexColorPicker } from 'react-colorful'
import { ColorBox } from "./index.style";
import PropTypes from 'prop-types';

const CellColorPicker = ({ index, name, color, setColor, ...props }) => {
    const [modalOpen, setModalOpen] = React.useState(false);

    return <Modal
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        trigger={
            <ColorBox
                style={{backgroundColor: color}}
            />
        }
        closeIcon
        size='small'
        centered={false}
        dimmer='inverted'
    >
        <Modal.Header>Select color for Cell {name}:</Modal.Header>
        <Modal.Content >
            <HexColorPicker
                color={color}
                onChange={(selectedColor) => setColor(index, selectedColor)}
            />


        </Modal.Content>

    </Modal>

}

CellColorPicker.propTypes = {
    index: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string,
    setColor: PropTypes.func
}

CellColorPicker.defaultProps = {
    index: 0,
    name: 'no_name',
    color: '#f1c40f',
    setColor: () => { }
}

export default CellColorPicker