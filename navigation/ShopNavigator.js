//createAppContainer ci permette di reindirizzarci subito all'app di riferimento, sarà il primo component che verrà mostrato
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from "react-navigation-drawer";
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import Colors  from '../constants/Colors';
import {Platform} from 'react-native';

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


const ProductsNavigator=createStackNavigator({
    ProductsOverview:ProductsOverviewScreen,
    ProductDetail:ProductDetailScreen,
    Cart:CartScreen
},
    {
        navigationOptions:{
            drawerIcon:drawerConfig=><Ionicons 
            name={Platform.OS==='android'?'md-cart':'ios-cart'}
            size={23}
            color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions:defaultNavigationOptions,
    }


);

//creo un nuovo stackNavigator
const OrdersNavigator=createStackNavigator({
    Orders:OrdersScreen
},
{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons 
        name={Platform.OS==='android'?'md-list':'ios-list'}
        size={23}
        color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions:defaultNavigationOptions,
}
);

//creo un nuovo stackNavigator
const AdminNavigator=createStackNavigator({
    UserProducts:UserProductsScreen
},
{
    navigationOptions:{
        drawerIcon:drawerConfig=><Ionicons 
        name={Platform.OS==='android'?'md-create':'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
        />
    },
    defaultNavigationOptions:defaultNavigationOptions,
}
);

/**
 * dentro a questo shopNavigator che sarà un menù unirò i due stackNavigator qua sopra,
 * si utilizza contentOptions per il DrawerNavigator per gli stili
 */
const ShopNavigator=createDrawerNavigator({
    Products:ProductsNavigator,
    Orders:OrdersNavigator,
    Admin:AdminNavigator
},
{
    contentOptions:{
        activeTintColor:Colors.secondo
    }
});

export default createAppContainer(ShopNavigator);