import React from 'react';
import { fetchMovies, fetchMovieDetails } from '../api/api';
import FlatListMovies from '../components/FlatListMovies';
import SearchForm from '../components/SearchForm';
import { Button, Platform, Image, View, Text, StyleSheet, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  // Shorthand for:
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   }
  //// During compilation also moves other class propeties, like:
  //// this.someThing = () =>

  state = {
    page: 1,
    movies: null,
    totalResults: 0,
    loading: false,
    error: undefined
  };

  static navigationOptions = ({ navigation }) => {
    // 'navigation.getParam' or 'navigation.state.params'
    const params = navigation.state.params || {};

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

  handleSubmit = async (formState, page) => {
    Keyboard.dismiss();
    const movies = await fetchMovies(formState, page);
    // ????????????????????????????????????????????
    // Async/await parsing json 
    // if (movies.Response)
    if (movies.Response === 'True') {
      console.log(this.state.error);
      this.setState((prevState, props) => {
        return {
          count: prevState.count + 1,
          movies: movies.Search,
          totalResults: movies.totalResults,
          error: undefined
        };
      });
    } else {
      console.log(movies.Error);
      this.setState({
        movies: null,
        totalResults: 0,
        error: movies.Error
      });
    }
  }

  handleLoadMore = async (formState, page) => {
    const movies = await fetchMovies(formState, page);
    if (movies.Response === 'True') {
      console.log('more');
      this.setState((prevState, props) => {
        return {
          count: prevState.count + 1,
          movies: [...prevState.movies, ...movies.Search],
        };
      });
    }
  }

  handleSelectMovie = async movie => {
    const movieDetails = await fetchMovieDetails(movie.imdbID);
    console.log(movieDetails);
    this.props.navigation.push('Details', movieDetails);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!
    // debugger;
  }

  handleScroll = () => {
    if (this.state.totalResults > 10) {

    }

    this.setState({
      page: this.state.page + 1
    }, () => {
      this.fetchRecords(this.state.page);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Search for movies</Text>
          <Button title="more" onPress={() => this.handleLoadMore({title: 'pie'}, 2)}/>

          <SearchForm
            onSubmit={this.handleSubmit}
            page={this.state.page}
          />
          <Text style={styles.error}>{this.state.error}</Text>
        </View>
        {this.state.movies && (
          <View style={styles.results}>
            <Text style={styles.info}>{`Found ${this.state.totalResults} results:`}</Text>
            <FlatListMovies
              style={styles.resultsList}
              movies={this.state.movies}
              loading={this.state.loading}
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