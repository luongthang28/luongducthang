import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Homescreen extends Component {

    render() {
        return (
            <View style={styles.container}>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex=1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});