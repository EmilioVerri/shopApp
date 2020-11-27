import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";

import * as authActions from '../store/actions/auth';
/**
 * facciamo andare questa applicazione intantoche verifica se l'utente è loggato o non loggato
 * sarà molto veloce
 */

const StartupScreen = props => {
    const dispatch = useDispatch();
  
    useEffect(() => {
        /**adesso dobbiamo controllare se il token è ancora valido 
         * vado a richiamare gli elementi utilizzando la getItem e andando a prendere userData che è la key dentro actions auth
         * è la chiave usata per l'archiviazione metto un await così aspetta la verifica prima di eseguire il resto del codice
         * definisco una constante che trasforma i dati dentro alla key userData in JSON
         * se non troviamo nessun dato per quella chiave lo facciamo ritornare alla login page per rifare l'accesso
         * estraiamo dentro transformedData il token, userId e expiryDate dall'azione auth
         * ora verifichiamo se il token è ancora valido creo una nuova constante expitationDate dove gli passo una nuova data con dentro expiryDate
         * condizione if: se expirationDate è minore o uguale alla nuova Date o il token è false o l'userId è false
         * quindi se supera tuttii controlli naviga verso la sezione prodotti
        */
       const tryLogin = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
          props.navigation.navigate('Auth');
          return;
        }
        const transformedData = JSON.parse(userData);
        const { token, userId, expiryDate } = transformedData;
        const expirationDate = new Date(expiryDate);
  
        if (expirationDate <= new Date() || !token || !userId) {
          props.navigation.navigate('Auth');
          return;
        }

        /**calcoliamo qua il tempo di scadenza prendendo fondamentalmente la data di scadenza
         * definisco una constante expirationTime uguale alla expirationDate e utilizzo funzione getTime()
         * e sottraggo il timestamp attuale
         * questa constante la validiamo nell'auth.js
         */


        const expirationTime = expirationDate.getTime() - new Date().getTime();


        props.navigation.navigate('Shop');
            // creo nuova azione dentro actions
            dispatch(authActions.authenticate(userId, token, expirationTime));
        };
    

        tryLogin();//richiamo funzione
    }, [dispatch]);


    return (
        <View style={styles.screen}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
    });
    
    export default StartupScreen;
    