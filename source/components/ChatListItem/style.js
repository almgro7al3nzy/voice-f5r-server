import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { fontScale } from "../../utils/functions";

export const styles = StyleSheet.create({
    rightContainer:{
        alignSelf:'flex-end',
        backgroundColor:colors.white,
        padding:fontScale(5),
        borderRadius:fontScale(10),
        marginVertical:fontScale(5)
    },
    leftContainer:{
        alignSelf:'flex-start',
        backgroundColor:colors.white,
        padding:fontScale(5),
        marginHorizontal:5,
        borderRadius:fontScale(10),
        marginVertical:fontScale(5)
    }
})