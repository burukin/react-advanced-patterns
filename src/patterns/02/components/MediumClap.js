import React, {useState, useCallback} from 'react';
import styles from '../../index.css'

import { useClapAnimation } from '../hooks/useClapAnimation';
import ClapIcon from './ClapIcon';
import ClapCount from './ClapCount';
import CountTotal from './CountTotal';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

const MediumClap = () => {
  const MAXIMUM_USER_CLAP = 50
  const [clapState, setClapState] = useState(initialState)
  const { count, countTotal, isClicked } = clapState

  const [{ clapRef, clapCountRef, clapTotalRef }, setRefState] = useState({})

  const setRef = useCallback(node => {
    setRefState(prevRefState => ({
      ...prevRefState,
      [node.dataset.refkey]: node
    }))
  }, [])

  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    countEl: clapCountRef,
    clapTotalEl: clapTotalRef
  })

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
    <button
      ref={setRef}
      data-refkey='clapRef'
      className={styles.clap}
      onClick={handleClapClick}
    >
      <ClapIcon isClicked={isClicked} />
      <ClapCount count={count} setRef={setRef} />
      <CountTotal countTotal={countTotal} setRef={setRef} />
    </button>
  )
}

export default MediumClap;