import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'

const initialState = {
  unReadMessageCount: 0,
  patients: {},
}

const initialChatRoomState = {
  chatRoomId: null,
  chatRoomName: '',
  unReadMessageCount: 0,
  latestMessageCreatedAt: null,
  latestMessageData: null,
  latestMessageList: null,
  participants: [],
  status: 'OPEN',
  messages: [],
}

const chatViewReducer = (state = initialState, action) => {
  const { patientId } = action
  let count = 0
  switch (action.type) {
    case 'UPDATE_CHAT_ROOM': {
      const chatRooms = state.patients
      const existsChatRoom = chatRooms[patientId]
      if (existsChatRoom) {
        const mergeMessages = uniqWith(
          [
            ...action.messages.sort((a, b) => a.createdAt > b.createdAt),
            ...state.patients[patientId].messages,
          ],
          isEqual,
        )
        return {
          ...state,
          patients: {
            ...state.patients,
            [patientId]: {
              ...state.patients[patientId],
              messages: mergeMessages,
              chatRoomId: action.chatRoomId,
              chatRoomName: action.chatRoomName,
            },
          },
        }
      }
      return state
    }
    case 'OPEN_CHAT_WINDOW': {
      const patients = state.patients
      const existsPatient = patients[patientId]
      if (existsPatient) {
        existsPatient.status = 'OPEN'
      }
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: existsPatient || { ...initialChatRoomState, status: 'OPEN' },
        },
      }
    }
    case 'CLOSE_CHAT_WINDOW': {
      return {
        ...state,
        patients: omit(state.patients, [patientId]),
      }
    }
    case 'SET_LATEST_MESSAGE_LIST':
      return {
        ...state,
        latestMessageList: action.latestMessageList,
        latestMessageData: action.data,
      }
    case 'SET_ALL_UNREAD_COUNT':
      return {
        ...state,
        allUnreadCount: action.allUnreadCount,
      }
    case 'MESSAGE_ADDED':
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: {
            ...state.patients[patientId],
            messages: [...state.patients[patientId].messages, action.messages],
          },
        },
      }
    case 'MORE_MESSAGE_ADDED':
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: {
            ...state.patients[patientId],
            messages: [
              ...action.messages.sort((a, b) => a.createdAt > b.createdAt),
              ...state.patients[patientId].messages,
            ],
          },
        },
      }

    case 'CLEAR_MSG_COUNT':
      return {
        ...state,
        latestMessageList: state.latestMessageList.map((item) => {
          if (item.roomId === action.roomId) {
            count = item.unreadMessageCount
            return {
              ...item,
              unreadMessageCount: 0,
            }
          }
          return item
        }),
        allUnreadCount: state.allUnreadCount - count,
      }

    default:
      return state
  }
}

export default chatViewReducer
