import React from 'react';
import { Button, Platform, Image, View, Text } from 'react-native';
import AppContainer from './navigation/AppNavigator.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SplashScreen } from 'expo';


import {store, persistor} from './redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

// import React from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

// const MainNavigator = createStackNavigator({
//   Home: {screen: HomeScreen},
//   Results: {screen: ResultsScreen},
//   Details: {screen: DetailsScreen},
// });

// const App = createAppContainer(MainNavigator);

// export default App;



// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <Text>Op working on your app!</Text>
// //     </View>
// //   );
// // }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'orange',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
