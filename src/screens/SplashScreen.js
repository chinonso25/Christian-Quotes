import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class SplashScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      <Image
        source={require('./../../assets/ic_launcher.png')}
      />
      <Text style={styles.welcome}>Hall of Faith</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9c27b0',
    width:"100%"
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    color:"#fff"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});
