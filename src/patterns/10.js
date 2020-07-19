import React, {useState}  from 'react';
import userStyles from './usage.css'

import {useClapState, useDOMRef, useClapAnimation, useEffectAfterMount} from './10/hooks';

import ClapContainer from './10/components/ClapContainer';
import ClapCount from './10/components/ClapCount';
import CountTotal from './10/components/CountTotal';
import ClapIcon from './10/components/ClapIcon';

const userInitialState = {
  count: 0,
  countTotal: 1000,
  isClicked: false
}

const Usage = () => {
  const [timesClapped, setTimeClapped] = useState(0)
  const isClappedTooMuch = timesClapped >= 7
  const reducer = (state, action) => {
    if (action.type === useClapState.types.clap && isClappedTooMuch) {
      return state
    }
    return useClapState.reducer(state, action)
  }

  const {
    clapState,
    getTogglerProps,
    getCounterProps,
    reset,
    resetDep
  } = useClapState(userInitialState, reducer)

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

  const [uploadingReset, setUpload] = useState(false)
  useEffectAfterMount(() => {
    setUpload(true)
    setTimeClapped(0)

    const id = setTimeout(() => {
      setUpload(false)
    }, 3000)

    return () => clearTimeout(id)
  }, [resetDep])

  const handleClick = () => {
    setTimeClapped(t => t + 1)
  }

  return (
    <div>
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
      <section>
        <button onClick={reset} className={userStyles.resetBtn}>
          reset
        </button>
        <pre className={userStyles.resetMsg}>
          {JSON.stringify({ timesClapped, count, countTotal })}
        </pre>
        <pre className={userStyles.resetMsg}>
          {uploadingReset ? `uploading reset ${resetDep} ...` : ''}
        </pre>
        <pre style={{ color: 'red' }}>
          {isClappedTooMuch
            ? `You have clapped too much. Don't be so generous!`
            : ''}
        </pre>
      </section>
    </div>
  )
}

export default Usage