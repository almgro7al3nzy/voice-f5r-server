import { Dimensions, Platform, StyleSheet } from "react-native";
import { fontScale } from "../../utils/functions";
import { height } from "../../utils/variable";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        height: Platform.OS == "android" ? height - fontScale(50) : height,
        width: '100%',
        position: 'absolute',
        paddingTop: Platform.OS == "ios" ? fontScale(50) : fontScale(40)
    },
    topContainer: {
        flex: 0.8,
        marginTop: fontScale(20)
    },
    searchContainer: {
        marginHorizontal: fontScale(10),
    },
    middleContainer: {
        flex: 6
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: Platform.OS == "ios" ? fontScale(20) : 0,
        paddingHorizontal: fontScale(10)
    },
    createRoom: {
        marginRight: fontScale(5)
    },
    joinRoom: {
        marginLeft: fontScale(5)
    }
})