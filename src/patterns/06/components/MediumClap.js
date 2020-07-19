import React from 'react';
import styles from '../../index.css'

import { useClapState, useDOMRef, useClapAnimation, useEffectAfterMount } from '../hooks';

import ClapIcon from './ClapIcon'
import ClapCount from './ClapCount'
import CountTotal from './CountTotal'

const MediumClap = () => {
  const [clapState, updateClapState] = useClapState()
  const { count, countTotal, isClicked } = clapState

  const [{ clapRef, clapCountRef, clapTotalRef }, setRef] = useDOMRef()

  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    countEl: clapCountRef,
    clapTotalEl: clapTotalRef
  })

  useEffectAfterMount(() => {
    animationTimeline.replay()
  }, [count])

  return (
    <button
      ref={setRef}
      data-refkey='clapRef'
      className={styles.clap}
      onClick={updateClapState}
    >
      <ClapIcon isClicked={isClicked} />
      <ClapCount count={count} setRef={setRef} />
      <CountTotal countTotal={countTotal} setRef={setRef} />
    </button>
  )
}

export default MediumClap;