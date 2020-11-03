import React from 'react';
import { Text, View } from 'react-native';
//importo il creatore dello store e il combinatore di reducers anche se adesso ne abbiamo solo 1
import {createStore,combineReducers} from 'redux';
//importo REDUX il provider che servirà ad avvolgere la nostra app
import {Provider} from 'react-redux';

//importiamo il reducers
import productsReducer from './store/reducers/products';

import ShopNavigator from './navigation/ShopNavigator';

/**
 * la constante rootReducer con il combineReducers ci permette di mappare i reducers
 */
const rootReducer=combineReducers({
    products:productsReducer
});
/**
 * creiamo la constante store che crea lo store e gli passiamo la constante rootReducer come argomento
 */
const store=createStore(rootReducer);

export default function App() {
    /**
     * nella RETURN DI APP:
     * definisco Provider e con store gli passo la constante definita sopra store
     */
  return (
    <Provider store={store}>
        <ShopNavigator />
    </Provider>
  );
}
