import React from 'react';
import { useSelector } from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';

//import ShopNavigator from './ShopNavigator'; vado a riprendere direttamente il nome della constante exportata da SHopNavigator
import {ShopNavigator,AuthNavigator} from './ShopNavigator';

import StartupScreen from '../screens/StartupScreen';

//import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';


/*creo un nuovo componente con la createStackNavigator
*/
//const MyStack=createStackNavigator();

//rinonimoil componente per evitare confusione
const AppNavigator = props => {
  //const navRef = useRef(); TOLGO NELLA 5
  //metto davanti il bang operator si fa sui valori nulli per dagli valore, se token ci sarà allora ritorna vero senò false
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);


/**
 * definisco useEffect come dipendenza avrà isAuth
 * e dentro avrà un controllo if se isAuth è vero.
 * se è vero non faccio niente ma se è falso devo gestirlo
 */
/*
useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    }
  }, [isAuth]);
  COMMENTO QUESTO PERCHE' NELLA 5 NON CI SERVE
  */

 // return <ShopNavigator ref={navRef}  />; NON CI SARA' PIU' UNA RETURN CON REF PERCHE' SIAMO NELLA 5

 /**RETURN:
  * tutta la logica di navigazione dentro al NavigationContainer importato da react
  * molto simile al createAppContainer
  * utilizzo mystack.Navigator come componente react è un oggetto con la proprietà di navigazione
  * richiama la constante definita sopra
  * tra <MyStack.Navigator></MyStack.Navigator> mettiamo gli screen che vogliamo facciano parte di quellostack
  * <MyStack.Screen /> richiamo sempre la constante sopra MyStack e gli passo la proprietà screen e richiama il componente che viene caricato per primo
  * in questo caso gli passiamo ProductsOverview che è del componente ProductsOverviewScreen
  * gli passiamo un altra proprietà component e dentro gli passo ProductsOverviewScreen
  * ESEMPIO:
  *  return (
     <NavigationContainer>
         <MyStack.Navigator>
             <MyStack.Screen 
             name="ProductsOverview" 
             component={ProductsOverviewScreen}
             />
         </MyStack.Navigator>
     </NavigationContainer>
 );
};
  */
 /**richiamiamo dentro al NavigationContainer tutti gli import dalla ShopApp */
 return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
