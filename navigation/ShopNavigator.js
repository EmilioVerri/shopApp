//createAppContainer ci permette di reindirizzarci subito all'app di riferimento, sarà il primo component che verrà mostrato
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from "react-navigation-drawer";
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';//serve per non tornare in dietro alla schermata di login una volta superata
import {DrawerItems} from 'react-navigation-drawer';
import React from 'react';
import {useDispatch} from 'react-redux';


import * as authActions from '../store/actions/auth';


import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors  from '../constants/Colors';
import {Platform,SafeAreaView,Button,View} from 'react-native';

import CartScreen from '../screens/shop/CartScreen';
import { Ionicons } from '@expo/vector-icons';


const defaultNavigationOptions={
    headerStyle:{
        backgroundColor:Platform.OS==='android'?Colors.secondo:''
    },
    headerTintColor:Platform.OS==='android'?'white':Colors.terzo,
    headerTitleStyle:{
        fontFamily:'open-sans-bold',
    },
    headerBacktitleStyle:{
        fontFamily:'open-sans',
    }


}


const ProductsNavigator = createStackNavigator(
    {
      ProductsOverview: ProductsOverviewScreen,
      ProductDetail: ProductDetailScreen,
      Cart: CartScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
        defaultNavigationOptions:defaultNavigationOptions,
    }
    );


//creo un nuovo stackNavigator
const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions:defaultNavigationOptions,
}
);

//creo un nuovo stackNavigator
const AdminNavigator = createStackNavigator(
    {
      UserProducts: UserProductsScreen,
      EditProduct: EditProductScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
    defaultNavigationOptions:defaultNavigationOptions,
}
);

/**
 * dentro a questo shopNavigator che sarà un menù unirò i due stackNavigator qua sopra,
 * si utilizza contentOptions per il DrawerNavigator per gli stili
 */
const ShopNavigator = createDrawerNavigator(
    {
      Products: ProductsNavigator,
      Orders: OrdersNavigator,
      Admin: AdminNavigator
    },
    {
      contentOptions: {
        activeTintColor:Colors.secondo
    },
    /**
     * definisco una contentComponent che prende una funzione
     * <DrawerItems {...props}/> devo sempre impostarlo così
     * 
     */
        contentComponent:props=>{
            const dispatch=useDispatch();
            return(
            <View style={{flex:1,paddingTop:20}}>
                <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
                    <DrawerItems {...props} />
                    <Button 
                    title="Logout" 
                    color={Colors.primary}
                    onPress={()=>{
                        dispatch(authActions.logout());
                        props.navigation.navigate('Auth');
                    }} />
                </SafeAreaView>
            </View>
            )
        }
    
}
);



const AuthNavigator=createStackNavigator({
    Auth:AuthScreen
},
{
defaultNavigationOptions:defaultNavigationOptions,
}
)


const MainNavigator=createSwitchNavigator(
    {
        Startup: StartupScreen,
        Auth: AuthNavigator,
        Shop:ShopNavigator
    }
)
export default createAppContainer(MainNavigator);