import React from 'react'
import { Dimensions, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

const Container = ({children,style}) => {
  return (
    <SafeAreaView style={{...style,...styles.container}}>
        <StatusBar backgroundColor={'transparent'} translucent/>
        {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        height:Dimensions.get("window").height
    }
})
export default Container