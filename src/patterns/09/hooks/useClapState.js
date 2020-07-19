import {useState, useCallback, useRef} from 'react';

import {usePrevious} from './usePrevious';

const INITIAL_STATE = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

const callFnsInSequence = (...fns) => (...args) => {
  fns.forEach(fn => fn && fn(...args))
}

export const useClapState = (initialState = INITIAL_STATE) => {
  const MAXIMUM_USER_CLAP = 50
  const userInitialState = useRef(initialState)

  const [clapState, setClapState] = useState(initialState)
  const { count, countTotal } = clapState

  const updateClapState = useCallback(() => {
    setClapState(({ count, countTotal }) => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMUM_USER_CLAP),
      countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal
    }))
  }, [count, countTotal])

  const resetRef = useRef(0)
  const prevCount = usePrevious(count)
  const reset = useCallback(() => {
    if (prevCount !== count) {
      setClapState(userInitialState.current)
      resetRef.current++
    }
  }, [prevCount, count, setClapState])

  const getTogglerProps = ({ onClick, ...otherProps } = {}) => ({
    onClick: callFnsInSequence(updateClapState, onClick),
    'aria-pressed': clapState.isClicked,
    ...otherProps
  })

  const getCounterProps = ({ ...otherProps }) => ({
    count,
    'aria-valuemax': MAXIMUM_USER_CLAP,
    'aria-valuemin': 0,
    'aria-valuenow': count,
    ...otherProps
  })

  return {
    clapState,
    updateClapState,
    getTogglerProps,
    getCounterProps,
    reset,
    resetDep: resetRef.current
  }
}