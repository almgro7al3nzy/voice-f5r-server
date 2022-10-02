import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { fontScale } from "../../utils/functions";

export const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.lightblue,
        justifyContent:'center'
    },
    form:{
        marginHorizontal:fontScale(30)
    },
    loading:{
        marginTop:fontScale(15)
    }
})