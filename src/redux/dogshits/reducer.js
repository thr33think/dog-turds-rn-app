import { actionHandlers } from './actionTypes'

export const initState = {
  records: [],
  isLoading: false,
  hasError: false,
  currentTurd: null,
}

export default (state = initState, action) => {
  const handler = actionHandlers[action.type]

  return handler ? handler(state, action) : state
}
