import React from 'react';
import { Input } from 'semantic-ui-react'
import InfoIcon from "../InfoIcon";
import PropTypes from 'prop-types';

const SeedInput = ({ seed, setSeed, ...props }) => {
    return <>
        <Input
            value={seed}
            onChange={(_,{ value}) => setSeed(value)}
            label={{ basic: true, content: 'Seed: '}}
            placeholder='Seed...'
            {...props}
        />
        <InfoIcon
            text={'Seed for the map generation.' +
            ' The same seed, with the same parameters, ' +
            'will generate the same output everytime. ' +
            'This property can be left blank.'}
        />
    </>

}

SeedInput.propTypes = {
    seed: PropTypes.string,
    setSeed: PropTypes.func
}

SeedInput.defaultProps = {
    seed: '',
    setSeed: () => { }
}

export default SeedInput