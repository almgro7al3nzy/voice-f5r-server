import { Platform, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { fontScale } from "../../utils/functions";
import { height } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: Platform.OS == "android" ? height - fontScale(50) : height,
        width: '100%',
        position: 'absolute',
        paddingTop: Platform.OS == "ios" ? fontScale(50) : fontScale(40),
        // backgroundColor:colors.grey
    },
    menuContainer:{
        flex:0.95,
        backgroundColor:'rgba(255, 255, 255,0.7)',
        borderRadius:fontScale(20),
        marginHorizontal:fontScale(15),
        marginTop:fontScale(70)
    },
    signoutButton:{
        margin:fontScale(15),
    },
    signoutContainer:{
        marginTop:fontScale(10),
        marginHorizontal:fontScale(10)
    },
    avatar:{
        alignSelf:"center",
        marginTop:fontScale(-35)
    },
    inforAndMenu:{
        marginTop:fontScale(20)
    }
})