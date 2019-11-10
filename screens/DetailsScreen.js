import React from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import DetailsRow from '../components/DetailsRow';
import ShareButton from '../components/ShareButton';


export default class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    // const { params } = navigation.state;

    return {
      // headerTitle: params ? params.Title : 'Movie details',
      headerTitle: `"${navigation.getParam('Title')}"`,
      headerRight: () => (
        <ShareButton
          title={navigation.getParam('Title')}
          year={navigation.getParam('Year')}
        />
      ),
    };
  };

  render() {
    const rowsList = [
      'Year',
      'Rated',
      'Released',
      'DVD',
      'Runtime',
      'Type',
      'Genre',
      'Director',
      'Writer',
      'Actors',
      'Plot',
      'Language',
      'Country',
      'Awards',
      'Metascore',
      'imdbRating',
      'imdbVotes',
      'BoxOffice',
      'Production',
      'Website'
    ];
    // Read the params from the navigation state
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container} >
        <ScrollView contentContainerStyle={styles.scroll} >
          <Text style={styles.textTitle}>
            {this.props.navigation.getParam('Title')}
          </Text>
          <Image
            style={styles.image}
            source={(this.props.navigation.getParam('Poster') == 'N/A') ? require('../assets/defaultImage.jpg') : { uri: this.props.navigation.getParam('Poster') }}
            resizeMode='contain'
          />
          <View style={styles.rows}>
            {rowsList.map((row, key) => (
              <DetailsRow
                key={key}
                heading={row}
                detail={params[row]} />
            ))}
          </View>
        </ScrollView >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexGrow: 1,
    justifyContent: 'space-around',
    // flexBasis: (Dimensions.get('window').height),
    ...Platform.select({
      web: {
        flexBasis: (Dimensions.get('window').height * 0.9),
      },
    }),
  },
  scroll: {
    flexGrow: 1,
    padding: 10,
    marginBottom: 50,
  },
  image: {
    width: 300,
    height: 444,
    margin: 20,
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
  }
});