import {useReducer, useCallback, useRef} from 'react';

import {usePrevious} from './usePrevious';

const INITIAL_STATE = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

const MAXIMUM_USER_CLAP = 50

const internalReducer = ({ count, countTotal }, { type, payload }) => {
  switch (type) {
    case 'clap':
      return {
        isClicked: true,
        count: Math.min(count + 1, MAXIMUM_USER_CLAP),
        countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal
      }
    case 'reset':
      return payload
    default:
      break
  }
}

const callFnsInSequence = (...fns) => (...args) => {
  fns.forEach(fn => fn && fn(...args))
}

export const useClapState = (
  initialState = INITIAL_STATE,
  reducer = internalReducer
) => {
  const userInitialState = useRef(initialState)

  const [clapState, dispatch] = useReducer(reducer, initialState)
  const { count, countTotal } = clapState

  const updateClapState = () => dispatch({ type: 'clap' })

  const resetRef = useRef(0)
  const prevCount = usePrevious(count)
  const reset = useCallback(() => {
    if (count) {
      dispatch({ type: 'reset', payload: userInitialState.current })
      resetRef.current++
    }
  }, [prevCount, count, dispatch])

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

useClapState.reducer = internalReducer
useClapState.types = {
  clap: 'clap',
  reset: 'reset'
}