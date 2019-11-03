import React from 'react';
import { fetchMovies, fetchMovieDetails } from '../api/api';
import FlatListMovies from '../components/FlatListMovies';
import SearchForm from '../components/SearchForm';
import { Button, Platform, Image, View, Text, StyleSheet, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { updateTitle, updateMovies, updatePage, stateS } from '../redux/actions';


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
    console.log(`1 ${this.props.title} ${this.props.page}`);
    this.props.updateTitle(formTitle);
    // this.props.updateMovies(formTitle, this.props.page);
    console.log(`3 ${this.props.title} ${this.props.page}`);
  }

  handleLoadMore = () => {
    if (this.props.totalResults > 10) {
      this.props.updatePage();
      // this.props.updateMovies(this.props.title, this.props.page);
    }
  }

  handleSelectMovie = async movie => {
    const movieDetails = await fetchMovieDetails(movie.imdbID);
    console.log(movieDetails);
    this.props.navigation.push('Details', movieDetails);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!
    // debugger;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
        <Button title="stateS" onPress={this.props.stateS}/>


          <Text style={styles.heading}>Search for movies</Text>
          <SearchForm
            onSubmit={this.handleSubmit}
          />
          <Text style={styles.error}>{this.props.error}</Text>
        </View>
        {(this.props.title.length != '') && (
          <View style={styles.results}>
            {!this.props.loading && (
              <Text style={styles.info}>{`Found ${this.props.totalResults} results:`}</Text>
            )}
            <FlatListMovies
              style={styles.resultsList}
              movies={this.props.movies}
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
  },
  error: {
    margin: 5,
    fontSize: 16,
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
  stateS
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);