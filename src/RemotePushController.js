

import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        

        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '99942419896',
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])

  return null
}

export default RemotePushController