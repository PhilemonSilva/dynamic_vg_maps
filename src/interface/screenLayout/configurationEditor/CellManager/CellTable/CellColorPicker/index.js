import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { HexColorPicker } from 'react-colorful'
import { ModalContentContainer } from "./index.style";
import PropTypes from 'prop-types';

const CellColorPicker = ({ index, name, color, setColor, ...props }) => {
    const [modalOpen, setModalOpen] = React.useState(false);

    return <Modal
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        trigger={
            <Button
                style={{backgroundColor: color, color: 'white'}}
                size={'tiny'}
            >
                {color}
            </Button>
        }
        size='small'
        centered={false}
        dimmer='inverted'
        {...props}
    >
        <Modal.Header>Select color for Cell {name}:</Modal.Header>
        <Modal.Content >
            <ModalContentContainer>
                <HexColorPicker
                    color={color}
                    onChange={(selectedColor) => setColor(selectedColor)}
                />
            </ModalContentContainer>
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