import { StyleSheet } from "react-native";
import { fontScale } from "../../utils/functions";

export const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        paddingRight:fontScale(10),
        alignItems:'center'
    },
    textContainer:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:fontScale(10)
    },
    input:{
        color:'white',
        fontSize:fontScale(17),
        fontWeight:'bold',
        width:'100%'
    },
    updatingTitle:{
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-between'
    },
    checkContainer:{
        position:"absolute",
        right:-fontScale(80)
    },
    nullContent:{
        width:fontScale(10)
    },
    normalTitle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingRight:fontScale(25)
    }
})