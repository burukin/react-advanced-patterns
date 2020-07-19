import React from 'react';

import {useClapState, useDOMRef, useClapAnimation, useEffectAfterMount } from './07/hooks';

import ClapContainer from './07/components/ClapContainer';
import ClapCount from './07/components/ClapCount';
import CountTotal from './07/components/CountTotal';
import ClapIcon from './07/components/ClapIcon';

const Usage = () => {
  const {
    clapState,
    updateClapState,
    togglerProps,
    counterProps
  } = useClapState()

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
    <ClapContainer setRef={setRef} data-refkey='clapRef' {...togglerProps}>
      <ClapIcon isClicked={isClicked} />
      <ClapCount setRef={setRef} data-refkey='clapCountRef' {...counterProps} />
      <CountTotal
        countTotal={countTotal}
        setRef={setRef}
        data-refkey='clapTotalRef'
      />
    </ClapContainer>
  )
}

export default Usage