import React from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk-next'


const App = (props) => {
  const [userInfo, setUserInfo] = React.useState(null);

  const login = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"])
    .then(function (result) {
      if (result.isCancelled) {
        alert("Login Cancelled " + JSON.stringify(result))
      } else {
        alert("Login success with  permisssions: " + result.grantedPermissions.toString());
        alert("Login Success " + result.toString() + JSON.stringify(result));
      }
    },function (error) {alert("Login failed with error: " + error);})}

  const logout = () => {
    LoginManager.logOut();
    setUserInfo(null);
  };

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,email,birthday,gender,picture.type(large),hometown',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      // {token},
      (error, user) => {
        if (error) {
          
        } else {
          setUserInfo(user);
          
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const login2 = () => {    
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile', 'user_birthday', 'user_gender']).then(
      login => {
        if (login.isCancelled) {
          
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        
      },
    );
  };


  // const isLogin = userInfo && userInfo.name;
  const buttonText = userInfo ? 'Logout With Facebook' : 'Login From Facebook';
  const onPressButton = userInfo
    ? logout
    : login2;
  return (
    <View style={{flex: 1, margin: 50}}>
      <TouchableOpacity
        onPress={onPressButton}
        style={{
          backgroundColor: 'blue',
          padding: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{buttonText}</Text>
      </TouchableOpacity>
      {userInfo && (
        <Text style={{fontSize: 16, marginVertical: 16}}>
          Logged in As {userInfo.name}
        </Text>
      )}
    </View>
  );
  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text>Facebook Login React Native Example</Text>
  //     <Button 
  //       title={'Login with Facebook'} 
  //       onPress={login} />
  //   </View>
  // );
}



export default App;