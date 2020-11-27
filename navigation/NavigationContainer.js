import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ShopNavigator from './ShopNavigator';

const NavigationContainer = props => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token);//metto davanti il bang operator si fa sui valori nulli per dagli valore, se token ci sarà allora ritorna vero senò false


/**
 * definisco useEffect come dipendenza avrà isAuth
 * e dentro avrà un controllo if se isAuth è vero.
 * se è vero non faccio niente ma se è falso devo gestirlo
 */
useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
