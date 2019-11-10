import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';


const Row = props => (
  <TouchableOpacity style={styles.row} onPress={() => props.onSelectMovie(props)}>
    <Image
      style={styles.image}
      source={(props.Poster == 'N/A') ? require('../assets/defaultImage.jpg') : { uri: props.Poster }}
    />
    <View style={styles.title}>
      <Text>{props.Title}</Text>
      <Text>{`(${props.Year})`}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    // alignContent: 'center',
    paddingVertical: 10,
    // borderWidth: 1,
    // borderColor: '#696969',
  },
  image: {
    width: 34,
    height: 50,
    marginRight: 10
  },
  title: {
    flex: 1
  }
});

Row.propTypes = {
  Title: PropTypes.string,
  Year: PropTypes.string,
  Poster: PropTypes.string,
};

export default Row;