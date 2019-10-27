import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';

const DetailsRow = props => (
  <View style={styles.container}>
    <Text style={styles.heading}>{`${props.heading}: `}</Text>
    <Text>{props.detail}</Text>
  </View>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // alignContent: 'center',
    paddingVertical: 10,
    marginRight: 50,
    // borderWidth: 1,
    // borderColor: '#696969',
  },
  heading: {
    fontWeight: 'bold'
  }
});

DetailsRow.propTypes = {
  heading: PropTypes.string,
  detail: PropTypes.string,
};

export default DetailsRow;