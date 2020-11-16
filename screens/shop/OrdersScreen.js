import React from 'react';
import {FlatList,Text,View,StyleSheet,Platform} from 'react-native';
import {useSelector} from 'react-redux';

//importo gli HeaderButton
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen=props=>{
    /**ORDERSCREEN:
     * salvo in una nuova constante con lo useSelector, orders che va preso nell'app.js .orders che è la variabile definita nell'initialState della reducers orders
     * 
     */
    const orders = useSelector(state => state.orders.orders);
    /**RETURN:
     * ritorniamo una FlatList, che come data ritorna la variabile sopra orders
     * come keyExtractor ritorna l'id 
     * come renderItem ritorniamo totalAmount di models orders dentro OrderItem
     * 
     * per la date richiamo funzione readableDate definita nei models di orders
     */
    return (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <OrderItem
              amount={itemData.item.totalAmount}
              date={itemData.item.readableDate}
              items={itemData.item.items}
            />
          )}//così possiamo usare la map dentro OrderItems e andiamo a riprendere dentro models orders items
          />
          );
        };

        OrdersScreen.navigationOptions = navData => {
            return {
              headerTitle: 'Your Orders',
              headerLeft: (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                      navData.navigation.toggleDrawer();//scrivendo questo appena clicco il bottone apre il menù
                    }}
                    />
                  </HeaderButtons>
                )
              };
            };
            
            export default OrdersScreen;