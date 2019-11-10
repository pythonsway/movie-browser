import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const DetailsRow = props => (
  <View style={styles.container}>
    <Text style={styles.heading}>{`${props.heading}: `}</Text>
    <Text style={styles.detail}>{props.detail}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // alignContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    // borderWidth: 1,
    // borderColor: '#696969',
  },
  heading: {
    fontWeight: 'bold'
  },
  detail: {
    flex: 1,    
    textAlign: 'justify'
  }
});

DetailsRow.propTypes = {
  heading: PropTypes.string,
  detail: PropTypes.string,
};

export default DetailsRow;