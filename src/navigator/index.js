import React from 'react';
import {Root} from 'native-base';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ListMonth from '../screens/ListMonth';
import Form from '../screens/Form';
import ListMonthDetail from '../screens/ListMonthDetail';

const AppStack = createStackNavigator(
  {
    ListMonth,
    Form,
    ListMonthDetail,
  },
  {initialRouteName: 'ListMonth', headerMode: 'none'},
);

const Apps = createAppContainer(AppStack);

export default () => (
  <Root>
    <Apps />
  </Root>
);
