import React, {useState} from 'react'
import styles from './index.css'
import userCustomStyles from './usage.css'

import MediumClap from './04/components/MediumClap';
import ClapIcon from './04/components/ClapIcon';
import ClapCount from './04/components/ClapCount';
import CountTotal from './04/components/CountTotal';

const Usage = () => {
  const [count, setCount] = useState(0)
  const handleClap = clapState => {
    setCount(clapState.count)
  }
  return (
    <div style={{ width: '100%' }}>
      <MediumClap onClap={handleClap} className={userCustomStyles.clap}>
        <ClapIcon className={userCustomStyles.icon} />
        <ClapCount className={userCustomStyles.count} />
        <CountTotal className={userCustomStyles.total} />
      </MediumClap>
      {!!count && (
        <div className={styles.info}>{`You have clapped ${count} times`}</div>
      )}
    </div>
  )
}

export default Usage