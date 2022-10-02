import React from 'react'
import { Text } from 'react-native'
import { localize } from '../localized';

const CustomText = ({ children, style, translate, ...rest }) => {
  // 
  const fontFamily = style && style.fontFamily 
  || style && style.fontWeight === 'bold' ? 'Rubik-Bold' : 'Rubik-Regular';

  // 

  return (
    <Text style={[fontFamily, style]} {...rest}>
      {translate ? localize(children) : children}
    </Text>
  )
}

export default CustomText

