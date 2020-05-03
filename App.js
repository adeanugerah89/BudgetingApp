import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-navigation';
import Navigator from './src/navigator';
import stores from './src/stores';

export default class App extends Component {
  render() {
    return (
      <Provider store={stores}>
        <SafeAreaView style={{flex: 1}}>
          <Navigator />
        </SafeAreaView>
      </Provider>
    );
  }
}
