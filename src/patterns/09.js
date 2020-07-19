import React, {useState}  from 'react';
import userStyles from './usage.css'

import {useClapState, useDOMRef, useClapAnimation, useEffectAfterMount} from './09/hooks';

import ClapContainer from './09/components/ClapContainer';
import ClapCount from './09/components/ClapCount';
import CountTotal from './09/components/CountTotal';
import ClapIcon from './09/components/ClapIcon';

const userInitialState = {
  count: 0,
  countTotal: 1000,
  isClicked: false
}

const Usage = () => {
  const {
    clapState,
    getTogglerProps,
    getCounterProps,
    reset,
    resetDep
  } = useClapState(userInitialState)

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

    const id = setTimeout(() => {
      setUpload(false)
    }, 3000)

    return () => clearTimeout(id)
  }, [resetDep])

  const handleClick = () => {
    console.log('CLICKED!!!!')
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
        <button onClick={reset} className={userStyles.resetBtn} disabled={uploadingReset}>
          reset
        </button>
        <pre className={userStyles.resetMsg}>
          {JSON.stringify({ count, countTotal, isClicked })}
        </pre>
        <pre className={userStyles.resetMsg}>
          {uploadingReset ? `uploading reset ${resetDep} ...` : ''}
        </pre>
      </section>
    </div>
  )
}

export default Usage