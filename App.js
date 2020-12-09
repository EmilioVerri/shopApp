import React,{useState} from 'react';
import { Text, View } from 'react-native';
//importo il creatore dello store e il combinatore di reducers anche se adesso ne abbiamo solo 1
import {createStore,combineReducers} from 'redux';
//importo REDUX il provider che servirà ad avvolgere la nostra app
import {Provider} from 'react-redux';

//importiamo il reducers
import productsReducer from './store/reducers/products';

//import ShopNavigator from './navigation/ShopNavigator'; al posto di questo importo il nuovo componente creato
//aggiurno import
import AppNavigator from './navigation/AppNavigator';

//importo i componenti per i font
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

import { composeWithDevTools } from 'redux-devtools-extension';

import cartReducer from './store/reducers/cart';

import ordersReducer from './store/reducers/order';

import authReducer from './store/reducers/auth';

//import per mandare richieste http:
import {applyMiddleware} from 'redux';
//importo ReduxThunk
import ReduxThunk from 'redux-thunk';
import auth from './store/reducers/auth';



import * as Notifications from 'expo-notifications';



/**
 * definisco all'esterno questo setNotificationHandler
 * dentro a questo oggetto definiamo come gestire le notifiche in arrivo se l'app è in esecuzione
 * handleNotification avremo una funzione che ritorna un oggetto che dice al sistema operativo cosa dovrebbe accadere quando si riceve una notifica
 * quando l'app è in esecuzione, nella return diciamo al sistema operativo cosa deve fare prima che la notifica venga fatta vedere all'utente
 * mettiamo handleNotification async così ritorna una promessa
 */
Notifications.setNotificationHandler({
    handleNotification:async()=>{
        /**ritorniamo un oggetto che descrive il comportamento del sistema operativo 
         * mettiamo che deve mostrare un alert lo mostra anche se l'app è chiusa ma voglio mostrarlo quando l'app è in esecuzione
         * vediamo la notifica anche se siamo dentro all'app, mettiamo anche un suono 
         * 
        */
        return {
            shouldShowAlert:true,
            shouldPlaySound:true
        };
    }
});




/**
 * la constante rootReducer con il combineReducers ci permette di mappare i reducers
 */
const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth:authReducer
  });
/**
 * creiamo la constante store che crea lo store e gli passiamo la constante rootReducer come argomento
 * gli passo anche il composeWidthDevTools
 * 
 * Definisco anche: applyMiddleware(ReduxThunk) per le chiamate http
 */
const store = createStore(rootReducer/*,composeWithDevTools ()*/, applyMiddleware(ReduxThunk));



//queste 4 righe si riferiscono ai fonts
const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
  };
    
    
   
    

  export default function App() {

    //definisco il richiamo dei fonts
    const[fontLoaded,setFontLoaded]=useState(false);
    if (!fontLoaded) {
        return (
          <AppLoading
            startAsync={fetchFonts}
            onFinish={() => {
              setFontLoaded(true);
            }}
          />
        );
      }//fine richiamo fonts

    /**
     * nella RETURN DI APP:
     * definisco Provider e con store gli passo la constante definita sopra store
     */
    return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      );
    }