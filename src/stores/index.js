import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistCombineReducers} from 'redux-persist';
import reducers from '../reducers';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const perReducers = persistCombineReducers(config, reducers);
const store = createStore(perReducers, {}, compose(applyMiddleware(thunk)));
export let persistor = persistStore(store);

export default store;
