import {useState, useCallback} from 'react';

const INITIAL_STATE = {
  count: 0,
  countTotal: 267,
  isClicked: false
}

export const useClapState = (initialState = INITIAL_STATE) => {
  const MAXIMUM_USER_CLAP = 50
  const [clapState, setClapState] = useState(initialState)
  const { count, countTotal } = clapState

  const updateClapState = useCallback(() => {
    setClapState(({ count, countTotal }) => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMUM_USER_CLAP),
      countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal
    }))
  }, [count, countTotal])

  return [clapState, updateClapState]
}