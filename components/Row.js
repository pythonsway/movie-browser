//   {
//       "Title": "American Pie",
//       "Year": "1999",
//       "imdbID": "tt0163651",
//       "Type": "movie",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BMTg3ODY5ODI1NF5BMl5BanBnXkFtZTgwMTkxNTYxMTE@._V1_SX300.jpg"
//   },

import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';


const Row = props => (
  <TouchableOpacity style={styles.row} onPress={() => props.onSelectMovie(props)}>
    <Image
      style={styles.image}
      source={(props.Poster == 'N/A') ? require('../assets/defaultImage.jpg') : { uri: props.Poster }}
    />
    <Text>{props.Title}</Text>
    <Text>{` (${props.Year})`}</Text>
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
  }
});

Row.propTypes = {
  Title: PropTypes.string,
  Year: PropTypes.string,
  Poster: PropTypes.string,
};

export default Row;