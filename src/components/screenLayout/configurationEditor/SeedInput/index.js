import React, {useEffect, useCallback, useState} from 'react';
import { Input, Button } from 'semantic-ui-react'
import InfoIcon from "../InfoIcon";
import PropTypes from 'prop-types';
import { getLastUsedSeed } from "../../../../scripts/randomNumberGenerator";

const SeedInput = ({ seed, setSeed, isGeneratingMap, ...props }) => {

    const [randomizedSeed, setRandomizedSeed] = useState('');


    let seedRandomizer = useCallback(()=> {
        if(!seed && isGeneratingMap) setRandomizedSeed(getLastUsedSeed());
    }, [isGeneratingMap])
    useEffect(() => {
        seedRandomizer();
    }, [seedRandomizer])
    return <>
        <Input
            value={seed}
            onChange={(_,{ value}) => setSeed(value)}
            label={{ basic: true, content: 'Seed: '}}
            placeholder='Seed...'
            {...props}
        />
        <Button
            basic
            color='blue'
            onClick={() => setSeed(randomizedSeed)}
            loading={isGeneratingMap}
            style={{marginLeft: '5px'}}
        >
            Get Current Map Seed
        </Button>
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
    setSeed: PropTypes.func,
    isGeneratingMap: PropTypes.func
}

SeedInput.defaultProps = {
    seed: '',
    setSeed: () => { },
    isGeneratingMap: () => { }
}

export default SeedInput