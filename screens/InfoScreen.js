import React from 'react';
import { Button, Platform, Image, View, Text, Linking, StyleSheet } from 'react-native';


export default class InfoScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>by Python's Way</Text>
        <Text style={styles.link}
          onPress={() => Linking.openURL('https://pythonsway.it/')}>
          https://pythonsway.it
        </Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back"
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 165, 0, 0.9)'
  },
  text: {
    margin: 10,
    fontSize: 36,
  },
  link: {
    marginBottom: 60,
    fontSize: 24,
    textDecorationLine: 'underline',
    color: 'navy'
  }
});