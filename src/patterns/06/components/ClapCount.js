import React from 'react';
import styles from '../../index.css'

const ClapCount = ({ count, setRef }) => {
  return (
    <span ref={setRef} data-refkey='clapCountRef' className={styles.count}>
      + {count}
    </span>
  )
}

export default ClapCount;