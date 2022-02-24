import React from 'react';
import { Popup, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { Wrapper } from './index.style'

const InfoIcon = ({ text, ...props }) => {
    return <Popup
        content={text}
        trigger={
            <Icon
                disabled
                name='question circle outline'
                size='large'
                {...props}
            />
        }
    />
}

InfoIcon.propTypes = {
    text: PropTypes.string
}

InfoIcon.defaultProps = {
    text: ''
}

export default InfoIcon