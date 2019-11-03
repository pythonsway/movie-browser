import React from 'react';
import { Button, Platform, Image, View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ShareButton from '../components/ShareButton';
import DetailsRow from '../components/DetailsRow';

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    // const { params } = navigation.state;
    // console.log(`1 ${Object.keys(params)}`);

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
    ]
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    console.log(`2 ${Object.keys(params)}`);
    // const movie = params.movieDetails;

    //   return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //       <Text>Details Screen</Text>
    //       <Text>itemId: {JSON.stringify(itemId)}</Text>
    //       <Text>otherParam: {JSON.stringify(otherParam)}</Text>
    //       <Button
    //         title="Update the title"
    //         onPress={() =>
    //           this.props.navigation.setParams({ otherParam: 'Updated!' })}
    //       />
    //       <Button
    //         title="Go to Details... again"
    //         onPress={() => this.props.navigation.navigate('Details')}
    //       />
    //       <Button
    //         title="Go back"
    //         onPress={() => this.props.navigation.goBack()}
    //       />
    //     </View>
    //   );
    // }


    return (
      <ScrollView contentContainerStyle={styles.container} >
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




      // <View>
      //   <Text>{movie.Title}</Text>
      //   <Image
      //     style={{ width: 300, height: 444 }}
      //     source={{ uri: props.Poster }}
      //     resizeMode='center'
      //   />
      //   <Text>{movie.Title}</Text>
      //   <Text>{`${props.Title} (${props.Year})`}</Text>
      // </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'space-around',
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