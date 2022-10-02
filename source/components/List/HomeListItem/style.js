import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";
import { fontScale } from "../../../utils/functions";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        marginHorizontal:fontScale(10),
        borderRadius:fontScale(10),
        marginVertical:fontScale(5),
        padding:fontScale(10),
        flexDirection:'row'
    },
    textContent:{
        marginHorizontal:10,
        justifyContent:'center'
    }
})