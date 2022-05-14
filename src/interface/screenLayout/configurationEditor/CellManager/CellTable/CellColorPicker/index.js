import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { HexColorPicker } from 'react-colorful'
import { ModalContentContainer } from "./index.style";
import PropTypes from 'prop-types';

const CellColorPicker = ({ name, color, setColor, ...props }) => {
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
    name: PropTypes.string,
    color: PropTypes.string,
    setColor: PropTypes.func
}

CellColorPicker.defaultProps = {
    name: 'no_name',
    color: '#808080',
    setColor: () => { }
}

export default CellColorPicker