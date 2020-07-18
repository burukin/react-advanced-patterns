import React from 'react';
import styles from '../../index.css'

const CountTotal = ({ countTotal }) => {
  return (
    <span id='clapCountTotal' className={styles.total}>
      {countTotal}
    </span>
  )
}

export default CountTotal;