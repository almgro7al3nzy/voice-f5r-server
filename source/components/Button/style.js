import { StyleSheet } from "react-native";
import { fontScale } from "../../utils/functions";

export const styles = StyleSheet.create({
    container:{
        paddingHorizontal:fontScale(10),
        paddingVertical:fontScale(13),
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
    }
})