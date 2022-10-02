import omit from 'lodash/omit'

// const navInfoFromLocalStorage = JSON.parser(localStorage.getItem('iHealth_navInfo') || '{}')

const initialState = {
  isOpenSliderNav: false,
  selectedKeys: ['home'],
}
const leftNavReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LEFTNAV_PROPERTY':
      return {
        ...state,
        ...omit(action, 'type'),
      }
    default:
      return state
  }
}

export default Object.assign({}, { leftNav: leftNavReducer })
