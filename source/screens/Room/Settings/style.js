import { Platform, StyleSheet } from "react-native";
import { fontScale } from "../../../utils/functions";
import { height } from "../../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: Platform.OS == "android" ? height - fontScale(50) : height,
        width: '100%',
        position: 'absolute',
        paddingTop: Platform.OS == "ios" ? fontScale(50) : fontScale(40)
    },
    content:{
        marginTop:fontScale(30)
    },
    voiceMenu:{
        flexDirection:'row',
        justifyContent:"space-between",
        marginHorizontal:fontScale(16)
    }
})