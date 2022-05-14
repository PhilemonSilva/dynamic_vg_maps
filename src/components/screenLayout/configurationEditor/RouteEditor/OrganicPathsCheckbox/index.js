import React from 'react';
import {Checkbox} from 'semantic-ui-react'
import InfoIcon from "../../InfoIcon";
import PropTypes from 'prop-types';

const OrganicPathsCheckbox = ({ organicPaths, setOrganicPaths, ...props }) => {
    return <>
        <Checkbox
            checked={organicPaths}
            onChange={(_, data) => setOrganicPaths(data.checked)}
            label='Organic Paths'
            style={{marginLeft:'5px'}}
            {...props}
        />
        <InfoIcon
            text={'Allows for a smalls adjustment of path length to generate more smooth paths.' +
                'The minimum width of paths is still the same, but the maximum width may increase.'}
        />
    </>

}

OrganicPathsCheckbox.propTypes = {
    organicPaths: PropTypes.bool,
    setOrganicPaths: PropTypes.func
}

OrganicPathsCheckbox.defaultProps = {
    organicPaths: false,
    setMapDimension: () => { }
}

export default OrganicPathsCheckbox