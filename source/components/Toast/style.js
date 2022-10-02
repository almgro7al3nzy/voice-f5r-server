import { StyleSheet } from "react-native";
import { fontScale } from "../../utils/functions";

export const styles = StyleSheet.create({
    container:{
        width:"90%",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        padding:fontScale(10),
        borderRadius:fontScale(20),
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        bottom:fontScale(30),
        position:"absolute"

    }
})