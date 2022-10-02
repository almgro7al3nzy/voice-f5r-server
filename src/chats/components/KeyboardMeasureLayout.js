import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';

const MeasureLayout = ({ children }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
    }
  };

  const [layout, setLayout] = React.useState(null);

  const handleLayout = e => {
    const { nativeEvent: { layout } } = e;

    // 

    setLayout({
      ...layout,
      y: layout.y + (Platform.OS === 'android' ? StatusBar.currentHeight : 0),
    })
  }

  

  if (!layout) return <View onLayout={handleLayout} style={styles.container} />;  

  

  return children(layout);
}

export default MeasureLayout;