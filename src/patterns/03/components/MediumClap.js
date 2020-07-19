import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import styles from '../../index.css'

import { useClapAnimation } from '../hooks/useClapAnimation';
import {MediumClapContext} from '../context';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

const MediumClap = ({ children, onClap }) => {
  const MAXIMUM_USER_CLAP = 50
  const [clapState, setClapState] = useState(initialState)
  const { count } = clapState

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

  const componentJustMounted = useRef(true)
  useEffect(() => {
    if (!componentJustMounted.current) {
      console.log('onClap was called!!!')
      onClap && onClap(clapState)
    }
    componentJustMounted.current = false
  }, [count])

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

  const memoizedValue = useMemo(
    () => ({
      ...clapState,
      setRef
    }),
    [clapState, setRef]
  )

  const { Provider } = MediumClapContext

  return (
    <Provider value={memoizedValue}>
      <button
        ref={setRef}
        data-refkey='clapRef'
        className={styles.clap}
        onClick={handleClapClick}
      >
        {children}
      </button>
    </Provider>
  )
}

export default MediumClap;