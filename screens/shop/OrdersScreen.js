import React,{useEffect,useState} from 'react';
import {FlatList,Text,View,StyleSheet,Platform,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

//importo gli HeaderButton
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/order';
import Colors from '../../constants/Colors';

const OrdersScreen=props=>{

    const [isLoading,setIsLoading]=useState(false);

    const dispatch=useDispatch();
    /**ORDERSCREEN:
     * salvo in una nuova constante con lo useSelector, orders che va preso nell'app.js .orders che è la variabile definita nell'initialState della reducers orders
     * 
     */
    const orders = useSelector(state => state.orders.orders);

    /**definisco una useEffects per l'anciare l'azione:
     * definisco come dipendenza la dispatch
     * utilizzo il then, che dopo aver eseguito la dispatch esegue quello
     */
    useEffect(()=>{
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(()=>{
            setIsLoading(false);
        });
    },[dispatch])


    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.secondo}/>
            </View>
        )
    }


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
            

            const styles=StyleSheet.create({
                centered:{
                    alignItems:'center',
                    justifyContent:'center',
                    flex:1

                }
            })
            export default OrdersScreen;
            