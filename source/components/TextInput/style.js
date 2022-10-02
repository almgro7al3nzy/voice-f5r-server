import { Platform, StyleSheet } from "react-native";
import { fontScale } from "../../utils/functions";

export const styles = StyleSheet.create({
    container:{
        padding:fontScale(10),
        margin:fontScale(5),
        flexDirection:'row',
        shadowColor: "#ccc",
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        borderRadius:fontScale(10)
    },
    input:{
        marginLeft:fontScale(10),
        padding:Platform.OS=="android" ? fontScale(1) : fontScale(5),
    },
    icon:{
        
    }
})