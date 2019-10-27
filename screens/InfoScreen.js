import React from 'react';
import { Button, Platform, Image, View, Text, Linking } from 'react-native';


export default class InfoScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>by</Text>
        <Text style={{ color: 'blue' }}
          onPress={() => Linking.openURL('https://pythonsway.it/')}>
          Python's Way
        </Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

