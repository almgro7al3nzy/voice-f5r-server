/**
 * @format
 */

 import {AppRegistry, Platform} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 
// //  import PushNotificationIOS from "@react-native-community/push-notification-ios";
//  import PushNotification from "react-native-push-notification";
 
 
//  // Must be outside of any component LifeCycle (such as `componentDidMount`).
//  PushNotification.configure({
//    // (optional) Called when Token is generated (iOS and Android)
//    onRegister: function (token) {
//      console.log("TOKEN:", token);
//    },
//    onNotification: function (notification) {
//      console.log("NOTIFICATION:", notification);
//    },
//    permissions: {
//      alert: true,
//      badge: true,
//      sound: true,
//    },
//    senderID: '409923608128',
//    popInitialNotification: true,
//    requestPermissions: Platform.OS === 'ios',
//  });
 
 AppRegistry.registerComponent(appName, () => App);
 