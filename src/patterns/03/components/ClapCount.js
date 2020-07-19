import React from 'react';
import styles from '../../index.css'

import {useClapContext} from '../hooks/useClapContext';

const ClapCount = () => {
  const { count, setRef } = useClapContext()
  return (
    <span ref={setRef} data-refkey='clapCountRef' className={styles.count}>
      + {count}
    </span>
  )
}

export default ClapCount;