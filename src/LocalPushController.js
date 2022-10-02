import PushNotification from 'react-native-push-notification'
import { Platform } from 'react-native';


PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios'
})


PushNotification.createChannel(
  {
      channelId: "not1", // (required)
      channelName: "Channel", // (required)
  },
  (created) => 
);


export const LocalNotification = () => {
  PushNotification.localNotification({
    channelId: "not1",
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]'
  })
}