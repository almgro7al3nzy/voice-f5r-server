import React from 'react'
import { gql } from 'react-apollo'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import findKey from 'lodash/findKey'
import moment from 'moment'

export const queryMessages = gql`
  query Messages($patientId: ID!, $before: Date, $limit: Int) {
    patient(patientId: $patientId) {
      _id
      fullName
      # avator
      boundDetails {
        chatRoom {
          _id
          messages(before: $before, limit: $limit) {
            sender {
              _id
              avatar
            }
            type: __typename
            createdAt
            ... on TextMessage {
              text
            }
            ... on AudioMessage {
              audioUrl
            }
            ... on ImageMessage {
              imageUrl
            }
          }
        }
      }
    }
  }
`

export const queryLatestMessages = gql`
  query LatestMessage {
    me {
      _id
      fullName
      ... on HealthCareProfessional {
        healthCareTeams {
          ... on HealthCareTeam {
            patients {
              ... on Patient {
                _id
                fullName
                avatar
                boundDetails {
                  gender
                  dateOfBirth
                  chatRoom {
                    _id
                    latestMessage {
                      ... on TextMessage {
                        sender {
                          _id
                          __typename
                        }
                        text
                      }
                      createdAt
                    }
                    unreadMessageCount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const queryAllUnreadCount = gql`
  query AllLatestMessageUnreadCount {
    me {
      _id
      ... on HealthCareProfessional {
        healthCareTeams {
          ... on HealthCareTeam {
            patients {
              ... on Patient {
                _id
                boundDetails {
                  chatRoom {
                    _id
                    unreadMessageCount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
export const subscriptionMessage = gql`
  subscription chatMessageAdded($chatRoomId: String) {
    chatMessageAdded(chatRoomId: $chatRoomId) {
      _id
      __typename
      ... on TextMessage {
        text
      }
      ... on ImageMessage {
        imageUrl
      }
      ... on AudioMessage {
        audioUrl
      }
      sender {
        _id
        avatar
      }
      createdAt
      chatRoom {
        _id
      }
    }
  }
`

export const subChatRoomDynamics = gql`
  subscription chatRoomDynamics($userId: ID!) {
    chatRoomDynamics(userId: $userId) {
      _id
      __typename
      ... on TextMessage {
        text
      }
      ... on ImageMessage {
        imageUrl
      }
      ... on AudioMessage {
        audioUrl
      }
      sender {
        _id
        avatar
        fullName
      }
      createdAt
      chatRoom {
        _id
      }
    }
  }
`

export const updateMsgLastSeenAt = gql`
mutation MarkAllMessagesInChatRoomAsRead($chatRoomId: ID!) {
  markAllMessagesInChatRoomAsRead(chatRoomId: $chatRoomId)
}
`

export const openChatWindow = patientId =>
  (dispatch, getState) => {
    const { patients } = getState().chat
    if (Object.keys(patients).length < 4) {
      dispatch({
        type: 'OPEN_CHAT_WINDOW',
        patientId,
      })
    } else {
      dispatch({
        type: 'MODAL_SHOW',
        isShowModal: true,
        title: '提示',
        width: 300,
        content: <span>您好，系统只允许同时打开4个聊天窗口，请先关闭几个已打开的聊天窗口后再操作</span>,
      })
    }
  }

export const updateChatRoom = args => ({
  type: 'UPDATE_CHAT_ROOM',
  ...args,
})

export const closeChatWindow = patientId => ({
  type: 'CLOSE_CHAT_WINDOW',
  patientId,
})

export const openLatestMessageList = data => (dispatch) => {
  const patients = []
  // console.log('openLatestMessageList')
  // console.table(data)
  const { me } = data
  const teams = get(me, 'healthCareTeams')
  teams.forEach((team) => {
    const patientList = get(team, 'patients')
    if (isArray(patientList)) {
      patients.push(...patientList)
    }
  })
  // const patients = get(data, 'healthCareTeams[0].patients')
  const latestMessageList = patients.map(patient => ({
    roomId: get(patient, 'boundDetails.chatRoom._id'),
    patientId: get(patient, '_id'),
    name: get(patient, 'fullName'),
    avatar: get(patient, 'avatar'),
    gender: get(patient, 'boundDetails.gender') === 'MALE' ? '男' : '女',
    age: moment().year() - moment(get(patient, 'boundDetails.dateOfBirth')).year(),
    text: get(patient, 'boundDetails.chatRoom.latestMessage.text'),
    createdAt: get(patient, 'boundDetails.chatRoom.latestMessage.createdAt'),
    userType: get(patient, 'boundDetails.chatRoom.latestMessage.sender.__typename'),
    unreadMessageCount: get(patient, 'boundDetails.chatRoom.unreadMessageCount'),
  }))
  dispatch({
    type: 'SET_LATEST_MESSAGE_LIST',
    latestMessageList,
    data,
  })
}
export const getAllUnreadCount = (data, patients) => (dispatch) => {
  let allUnreadCount = 0
  const teams = get(data, 'healthCareTeams')

  teams.forEach((team) => {
    const teamPatients = get(team, 'patients')
    teamPatients.forEach((patient) => {
      const tmpChatRoomId = patient.boundDetails.chatRoom._id
      const tmpPatientKey = findKey(patients, { chatRoomId: tmpChatRoomId })
      if (!tmpPatientKey) {
        allUnreadCount += patient.boundDetails.chatRoom.unreadMessageCount
      } else {
        // if the patient's chatroom that you send has alreadly opened
        // we can't sum the message count
        console.log('this patient\'s chatroom has alreadly opened', patient.boundDetails, tmpChatRoomId)
      }
    })
  })
  dispatch({
    type: 'SET_ALL_UNREAD_COUNT',
    allUnreadCount,
  })
}

export const messageAdded = (patientId, newMessage) => ({
  type: 'MESSAGE_ADDED',
  patientId,
  messages: newMessage,
})

export const fetchMoreMessages = (patientId, messages) => ({
  type: 'MORE_MESSAGE_ADDED',
  patientId,
  messages,
})

export const openImage = imageUrl => ({
  type: 'MODAL_SHOW',
  isShowModal: true,
  width: 'unset',
  content: <img alt="img" style={{ width: '100%' }} src={imageUrl} />,
})

export const clearMsgCount = roomId => ({
  type: 'CLEAR_MSG_COUNT',
  roomId,
})

export const updateVoiceMsgTime = (msgId, audio) => (dispatch) => {
  const audioDuration = Math.round(audio.duration)
  let audioLength = 0
  if (audioDuration < 10) {
    audioLength = 10
  } else if (audioDuration >= 10 && audioDuration < 30) {
    audioLength = 30
  } else {
    audioLength = 50
  }
  console.log('audioLength', audioLength, 'audioDuration', audioDuration)
  dispatch({
    type: 'VOICE_MSG_TIME_CHANGE',
    msgId,
    audioDuration,
  })
}

export const voiceMsgPalying = (msgId, audio) => (dispatch) => {
  audio.play()
  dispatch({
    type: 'VOICE_MSG_PALYING',
    msgId,
  })
}

export const voiceMsgPalyed = msgId => (dispatch) => {
  dispatch({
    type: 'VOICE_MSG_PALYED',
    msgId,
  })
}
