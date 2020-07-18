import React from 'react';
import styles from '../../index.css'

const CountTotal = ({ countTotal, setRef }) => {
  return (
    <span ref={setRef} data-refkey='clapTotalRef' className={styles.total}>
      {countTotal}
    </span>
  )
}

export default CountTotal;