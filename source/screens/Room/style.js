import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { fontScale } from "../../utils/functions";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        height:Dimensions.get("screen").height,
        width:'100%',
        paddingTop:fontScale(40),
        position:'absolute',
    },
    header:{
        marginTop:fontScale(50)
    },
    bottomContain:{
        position:"absolute",
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10
    },
    messageList:{
        marginHorizontal:fontScale(10),
        marginTop:fontScale(10)
    }
})