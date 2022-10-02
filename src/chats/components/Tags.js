import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux';
// import { getTags } from '../actions';

const Tags = ({ tags, error }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // backgroundColor: 'red',
      // flex: 1,
      flexDirection: 'row',
      overflow: 'scroll',
    },
    tag: {
      // backgroundColor: 'blue',
      padding: 5,
      marginHorizontal: 5,
      marginVertical: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: colors.text3,
    },
    text: {
      // backgroundColor: 'green',
      color: colors.text,
    }
  };

  const handlePressTag = (tagId) => {
    
  }

  return (
    <ScrollView horizontal={true}>
      {tags && tags.map(tag => {
        return (
          <TouchableOpacity
            key={tag.id}
            style={styles.tag}
            onPress={() => handlePressTag(tag.id)}
          >
            <Text style={styles.text}>
              {tag.name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

export default Tags;
// const mapStateToProps = state => ({
//   tags: state.chats.tags,
//   error: state.chats.error,
// })

// export default connect(
//   mapStateToProps,
//   { getTags }
// )(Tags);
