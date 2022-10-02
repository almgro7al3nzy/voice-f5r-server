import { useTheme } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react'
import { View, TextInput } from 'react-native'
import { debounce } from '../utils'

const SearchBar = ({ placeholder, onSearch }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
    },
    input: {
      padding: 10,
      color: colors.text,
      // borderRadius: 5,
      // backgroundColor: 'red',
      // backgroundColor: colors.background,
    }
  };

  // const [query, setQuery] = useState('');

  const delayedQuery = debounce(query => onSearch(query), 1000);

  // const handleChangeText = (text) => {
  //   
  //   setQuery(text);
  //   delayedQuery(text);
  // }

  // var returnedFunction = debounce(function() {
  //   onSearch(query)
  // }, 250);


  return (
    <View style={styles.container}>      
      <View style={styles.content}>
        <View style={styles.row}>
          <MaterialCommunityIcons name='magnify' size={26} style={{ color: colors.text3 }} />
          <TextInput 
            style={styles.input}
            // value={query}
            onChangeText={delayedQuery}
            placeholder={placeholder}
            placeholderTextColor={colors.text3} 
            returnKeyType='search'
          />
        </View>
        <MaterialCommunityIcons name='close' size={26} style={{ color: colors.text3 }} />
      </View>
    </View>
  )
}

export default SearchBar
