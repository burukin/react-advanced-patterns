import React from 'react';
import styles from '../../index.css'

import {useClapContext} from '../hooks/useClapContext';

const ClapCount = ({ style: userStyles = {}, className }) => {
  const { count, setRef } = useClapContext()
  const classNames = [styles.count, className].join(' ').trim()
  return (
    <span ref={setRef} data-refkey='clapCountRef' className={classNames} style={userStyles}>
      + {count}
    </span>
  )
}

export default ClapCount;