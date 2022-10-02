import omit from 'lodash/omit'

const initialState = {
  activedPatient: {},
  userInfo: {},
}

const coreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_INFO':
      return { ...state, userInfo: action.userInfo }
    case 'SET_ACTIVE_PATIENT':
      return {
        ...state,
        activedPatient: {
          ...omit(action, 'type'),
        },
      }
    case 'UPDATE_PATIENT_AVATAR':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          avatar: action.avatar,
        },
      }
    default:
      return state
  }
}

export default Object.assign({}, { core: coreReducer })
