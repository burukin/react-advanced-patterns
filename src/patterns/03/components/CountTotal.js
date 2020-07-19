import React from 'react';
import styles from '../../index.css'

import {useClapContext} from '../hooks/useClapContext';

const CountTotal = () => {
  const { countTotal, setRef } = useClapContext()
  return (
    <span ref={setRef} data-refkey='clapTotalRef' className={styles.total}>
      {countTotal}
    </span>
  )
}

export default CountTotal;