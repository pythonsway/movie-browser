import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Row from './Row';

// obj.item from 'FlatList' API
const keyExtractor = (item, index) => index.toString();

const renderSeparator = () => <View style={styles.separator} />;


const FlatListMovies = props => {
  // inside component in order to access props in 'Row'
  const renderItem = ({ item }) => <Row {...item} onSelectMovie={props.onSelectMovie} />;
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator
          size="large"
          animating={props.loading ? true : false}
        />
      </View>
    );
  };

  return (
    <FlatList
      renderItem={renderItem}
      data={props.movies}
      // keyExtractor={item => item.imdbID} />
      keyExtractor={keyExtractor}

      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={renderFooter}
      onEndReached={props.onLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "85%",
    backgroundColor: "#CED0CE",
    marginLeft: "15%"
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  }
});


FlatListMovies.propTypes = {
  movies: PropTypes.array,
};

export default FlatListMovies;

