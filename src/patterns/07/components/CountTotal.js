import React from 'react';
import styles from '../../index.css'

const CountTotal = ({ countTotal, setRef, ...restProps }) => {
  return (
    <span ref={setRef} className={styles.total} {...restProps}>
      {countTotal}
    </span>
  )
}

export default CountTotal;