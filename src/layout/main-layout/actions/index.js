import { gql } from 'react-apollo'
import { message, notification } from 'antd'
import get from 'lodash/get'

export const queryUser = gql`
  query QueryUser {
    me {
      fullName
      mobile
      _id
      avatar
      ... on HealthCareProfessional {
        healthCareTeams {
          institution {
            name
          }
        }
        role
      }
    }
  }
`

export const getUserInfo = userInfo => (dispatch) => {
  dispatch({
    type: 'GET_USER_INFO',
    userInfo,
  })
}

export const newMessageComming = news => () =>
  message.info(
    `${news.fullName} : ${get(
      news,
      'content',
      '图像或语音信息',
    )}`,
  )


export const showNotice = (title, content) => () => {
  console.log('Notification.permission', Notification.permission)
  // if (!title) title = '桌面提醒'
  // if (!content) content = '您看到此条信息桌面提醒设置成功'
  const iconUrl = 'https://www.imcyk.com/favicon.ico'
  if (Notification.permission === 'granted') {
    const newNotification = new Notification(title, {
      body: content,
      icon: iconUrl,
    })
    newNotification.onclick = () => {
      notification.close()
    }
  } else {
    Notification.requestPermission((permission) => {
      // Whatever the user answers, we make sure we store the
      // information
      if (!('permission' in Notification)) {
        Notification.permission = permission
      }
      // 如果接受请求
      if (permission === 'granted') {
        const newNotification = new Notification(title, {
          icon: iconUrl,
          body: content,
        })
        newNotification.onclick = () => {
          notification.close()
        }
      }
    })
  }
}
