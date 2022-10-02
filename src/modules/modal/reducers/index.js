import omit from 'lodash/omit'

const initialState = { isShowModal: false }

export const closeModal = () => (
  {
    type: 'MODAL_HIDE',
  }
)

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MODAL_SHOW':
      return {
        ...state,
        ...omit(action, 'type'),
      }
    case 'MODAL_HIDE':
      return initialState
    default:
      return state
  }
}

export default Object.assign({}, { modal: modalReducer })
