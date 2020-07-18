import React from 'react';
import styles from '../../index.css'

const ClapCount = ({ count }) => {
  return (
    <span id='clapCount' className={styles.count}>
      + {count}
    </span>
  )
}

export default ClapCount;