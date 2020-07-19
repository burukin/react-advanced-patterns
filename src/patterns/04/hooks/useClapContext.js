import {useContext} from 'react';
import {MediumClapContext} from '../context';

export const useClapContext = () => {
    const context = useContext(MediumClapContext);
    return context;
}