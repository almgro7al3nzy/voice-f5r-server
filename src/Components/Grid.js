import React from 'react'
import { Dimensions, FlatList, PixelRatio, StyleSheet } from "react-native";
import PropTypes from 'prop-types';



const Grid = (props) => {

  const renderGridItem = (info) => {
    const { index } = info;
    const { renderItem, numColumns, itemMargin } = props;

    const { width } = Dimensions.get('window');

    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns
    );

    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({ ...info, size, marginLeft, marginTop });
  }

  return (
    <FlatList {...props} renderItem={renderGridItem} />
  );
}

Grid.propTypes = {
  renderItem: PropTypes.func.isRequired,
  numColumns: PropTypes.number,
  itemMargin: PropTypes.number,
};

Grid.defaultProps = {
  numColumns: 3,
  itemMargin: StyleSheet.hairlineWidth,
};

export default Grid;

const styles = StyleSheet.create({})
