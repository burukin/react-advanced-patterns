import React, {useState} from 'react'
import styles from './index.css'
import userCustomStyles from './usage.css'

import MediumClap from './05/components/MediumClap';
import ClapIcon from './05/components/ClapIcon';
import ClapCount from './05/components/ClapCount';
import CountTotal from './05/components/CountTotal';

const INITIAL_STATE = {
  count: 0,
  countTotal: 2100,
  isClicked: false
}

const MAXIMUM_CLAP_VAL = 10

const Usage = () => {
  const [state, setState] = useState(INITIAL_STATE)
  const handleClap = () => {
    setState(({ count, countTotal }) => ({
      count: Math.min(count + 1, MAXIMUM_CLAP_VAL),
      countTotal: count < MAXIMUM_CLAP_VAL ? countTotal + 1 : countTotal,
      isClicked: true
    }))
  }
  return (
    <div style={{ width: '100%' }}>
      <MediumClap values={state} onClap={handleClap} className={userCustomStyles.clap}>
        <ClapIcon className={userCustomStyles.icon} />
        <ClapCount className={userCustomStyles.count} />
        <CountTotal className={userCustomStyles.total} />
      </MediumClap>
      <MediumClap values={state} onClap={handleClap} className={userCustomStyles.clap}>
        <ClapIcon className={userCustomStyles.icon} />
        <ClapCount className={userCustomStyles.count} />
        <CountTotal className={userCustomStyles.total} />
      </MediumClap>
    </div>
  )
}

export default Usage