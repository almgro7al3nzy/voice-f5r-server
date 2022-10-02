// import React from 'react';
// import { View } from 'react-native';
// import { useTheme } from '@react-navigation/native';
// import ListHeader from './ListHeader';


// const ListView = () => {
//   const { colors } = useTheme();

//   const styles = {
//     container: {

//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ListHeader count={people.length}>PEOPLE NEARBY</ListHeader>
//       <FlatList
//         data={people}
//         keyExtractor={({id}) => id.toString()}
//         renderItem={({item}) => <ContactItem {...item} onPress={handleContactItemPress} onAddFriend={handleAddFriend} />}
//       />   
//     </View>  
//   );
// }

// export default ListView;