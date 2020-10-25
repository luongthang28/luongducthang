import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import HomeScreen from './screens/Homescreen';
import DetailsScreen from './screens/DetalsScreen';

import { StackNavigation } from 'react-navigation';

const DemoNavigation = StackNavigation({
  Home: { screen: HomeScreen},
});

export default DemoNavigation;