import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import styles from '../../index.css'

import { useClapAnimation } from '../hooks/useClapAnimation';
import {MediumClapContext} from '../context';

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

const { Provider } = MediumClapContext

const MediumClap = ({
  children,
  onClap,
  values = null,
  style: userStyles = {},
  className
}) => {
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
    if (!componentJustMounted.current && !isControlled) {
      onClap && onClap(clapState)
    }
    componentJustMounted.current = false
  }, [count, onClap, isControlled])

  const isControlled = !!values && onClap
  const handleClapClick = () => {
    animationTimeline.replay()
    isControlled
      ? onClap()
      : setClapState(prevState => ({
          isClicked: true,
          count: Math.min(count + 1, MAXIMUM_USER_CLAP),
          countTotal:
            count < MAXIMUM_USER_CLAP
              ? prevState.countTotal + 1
              : prevState.countTotal
        }))
  }
  const getState = useCallback(() => (isControlled ? values : clapState), [
    isControlled,
    values,
    clapState
  ])

  const memoizedValue = useMemo(
    () => ({
      ...getState(),
      setRef
    }),
    [getState, setRef]
  )

  const classNames = [styles.clap, className].join(' ').trim()

  return (
    <Provider value={memoizedValue}>
      <button
        ref={setRef}
        data-refkey='clapRef'
        className={classNames}
        onClick={handleClapClick}
        style={userStyles}
      >
        {children}
      </button>
    </Provider>
  )
}

export default MediumClap;