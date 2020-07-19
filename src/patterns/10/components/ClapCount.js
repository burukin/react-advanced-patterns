import React from 'react';
import styles from '../../index.css'

const ClapCount = ({ count, setRef, ...restProps }) => {
  return (
    <span ref={setRef} className={styles.count} {...restProps}>
      + {count}
    </span>
  )
}

export default ClapCount;