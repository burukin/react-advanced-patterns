import React, {useState} from 'react';
import styles from '../../index.css'

import ClapIcon from './ClapIcon';
import ClapCount from './ClapCount';
import CountTotal from './CountTotal';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

const MediumClap = ({ animationTimeline }) => {
  const MAXIMUM_USER_CLAP = 50
  const [clapState, setClapState] = useState(initialState)
  const { count, countTotal, isClicked } = clapState

  const handleClapClick = () => {
    animationTimeline.replay()
    setClapState(prevState => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMUM_USER_CLAP),
      countTotal:
        count < MAXIMUM_USER_CLAP
          ? prevState.countTotal + 1
          : prevState.countTotal
    }))
  }

  return (
    <button id='clap' className={styles.clap} onClick={handleClapClick}>
      <ClapIcon isClicked={isClicked} />
      <ClapCount count={count} />
      <CountTotal countTotal={countTotal} />
    </button>
  )
}

export default MediumClap;