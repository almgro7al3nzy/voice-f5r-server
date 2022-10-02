
const homeReducer = (state = { tick: 0 }, action) => {
  switch (action.type) {
    case 'tick':
      return { ...state, tick: state.tick + 1 }
    default:
      return state
  }
}

export default Object.assign({}, { home: homeReducer })
