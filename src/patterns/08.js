import React from 'react';

import {useClapState, useDOMRef, useClapAnimation, useEffectAfterMount } from './08/hooks';

import ClapContainer from './08/components/ClapContainer';
import ClapCount from './08/components/ClapCount';
import CountTotal from './08/components/CountTotal';
import ClapIcon from './08/components/ClapIcon';

const Usage = () => {
  const { clapState, getTogglerProps, getCounterProps } = useClapState()

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

  const handleClick = () => {
    console.log('CLICKED!!!!')
  }

  return (
    <ClapContainer
      setRef={setRef}
      data-refkey='clapRef'
      {...getTogglerProps({
        onClick: handleClick,
        'aria-pressed': false
      })}
    >
      <ClapIcon isClicked={isClicked} />
      <ClapCount
        setRef={setRef}
        data-refkey='clapCountRef'
        {...getCounterProps()}
      />
      <CountTotal
        countTotal={countTotal}
        setRef={setRef}
        data-refkey='clapTotalRef'
      />
    </ClapContainer>
  )
}

export default Usage