import React from 'react';
import styles from '../../index.css'

import {useClapContext} from '../hooks/useClapContext';

const CountTotal = ({ style: userStyles = {}, className }) => {
  const { countTotal, setRef } = useClapContext()
  const classNames = [styles.total, className].join(' ').trim()
  return (
    <span ref={setRef} data-refkey='clapTotalRef' className={classNames} style={userStyles}>
      {countTotal}
    </span>
  )
}

export default CountTotal;