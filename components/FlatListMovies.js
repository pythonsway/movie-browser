import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
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
        {(props.movies.length == props.totalResults) && (
          <Text>No more results</Text>
        )}

      </View>
    );
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: (Dimensions.get('window').height / 2),
    width: (Dimensions.get('window').width * 0.95)
  },
  separator: {
    height: 2,
    backgroundColor: "#CED0CE",
    // width: "95%",
    // marginLeft: "5%"
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 2,
    borderColor: "#CED0CE"
  }
});

FlatListMovies.propTypes = {
  movies: PropTypes.array,
};

export default FlatListMovies;

