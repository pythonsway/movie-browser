import React from 'react';
import { Keyboard, Platform, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { fetchMovieDetails } from '../api/api';
import { updateTitle, updateMovies, updatePage } from '../redux/actions';
import FlatListMovies from '../components/FlatListMovies';
import SearchForm from '../components/SearchForm';


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // 'navigation.getParam' or 'navigation.state.params'
    // const params = navigation.state.params || {};
    return {
      // 'headerTitle'- property specific to a stack navigator, defaults to a '<Text>' component that displays the 'title'
      headerTitle: 'Movie Browser',
      headerRight: (
        <Ionicons
          style={styles.icon}
          onPress={() => navigation.navigate('InfoModal')}
          name="ios-information-circle-outline"
          size={24}
          color="black"
        />
      ),
    };
  };

  handleSubmit = (formTitle) => {
    Keyboard.dismiss();
    this.props.updateTitle(formTitle);
  }

  handleLoadMore = () => {
    if (this.props.totalResults > 10) {
      this.props.updatePage();
    }
  }

  handleSelectMovie = async movie => {
    const movieDetails = await fetchMovieDetails(movie.imdbID);
    this.props.navigation.push('Details', movieDetails);
    // debugger;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Search for movies</Text>
          <SearchForm
            onSubmit={this.handleSubmit}
          />
          {this.props.error && (
            <Text style={styles.error}>{`"${this.props.title}": ${this.props.error}`}</Text>
          )}
        </View>
        {(this.props.totalResults > 0) && (
          <View style={styles.results}>
            <Text style={styles.info}>{`Found ${this.props.totalResults} results for "${this.props.title}":`}</Text>
            <FlatListMovies
              style={styles.resultsList}
              movies={this.props.movies}
              totalResults={this.props.totalResults}
              loading={this.props.loading}
              onSelectMovie={this.handleSelectMovie}
              onLoadMore={this.handleLoadMore}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  heading: {
    marginTop: 10,
    fontStyle: 'italic',
    fontSize: 36,
    fontWeight: 'bold'
  },
  results: {
    flex: 1,

  },
  resultsList: {
    flex: 1,
    marginTop: 10,
  },
  error: {
    margin: 5,
    fontSize: 16,
    textAlign: 'center',
    color: 'red'
  },
  info: {
    margin: 5,
    fontSize: 24,
    fontWeight: 'bold'
  },
  icon: {
    marginRight: 20
  }
});

const mapStateToProps = state => ({
  title: state.movies.title,
  page: state.movies.page,
  movies: state.movies.movies,
  totalResults: state.movies.totalResults,
  loading: state.movies.loading,
  error: state.movies.error,
});

const mapDispatchToProps = {
  updateTitle,
  updateMovies,
  updatePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);