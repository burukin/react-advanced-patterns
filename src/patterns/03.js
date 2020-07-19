import React, {useState} from 'react'
import styles from './index.css'

import MediumClap from './03/components/MediumClap';
import ClapIcon from './03/components/ClapIcon';
import ClapCount from './03/components/ClapCount';
import CountTotal from './03/components/CountTotal';

const Usage = () => {
  const [count, setCount] = useState(0)
  const handleClap = clapState => {
    setCount(clapState.count)
  }
  return (
    <div style={{ width: '100%' }}>
      <MediumClap onClap={handleClap}>
        <ClapIcon />
        <ClapCount />
        <CountTotal />
      </MediumClap>
      {!!count && (
        <div className={styles.info}>{`You have clapped ${count} times`}</div>
      )}
    </div>
  )
}

export default Usage