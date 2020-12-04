//createAppContainer ci permette di reindirizzarci subito all'app di riferimento, sarà il primo component che verrà mostrato
/*import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from "react-navigation-drawer";
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';//serve per non tornare in dietro alla schermata di login una volta superata
import {DrawerItems} from 'react-navigation-drawer';
TOLGO QUESTI IMPORT PER LA VERSIONE 5
*/
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';//importo la DrawerItemList

import React from 'react';
import {useDispatch} from 'react-redux';


import * as authActions from '../store/actions/auth';

//facciamo anche gli import degli elementi dentro a questi componenti
import ProductsOverviewScreen,{screenOptions as ProductsOverviewScreenOptions} from '../screens/shop/ProductsOverviewScreen';//gli metto un alias per non generare un errore di nomi uguali
import ProductDetailScreen,{screenOptions as ProductDetailScreenOptions} from '../screens/shop/ProductDetailScreen';//gli metto un alias per non generare un errore di nomi uguali
import OrdersScreen,{screenOptions as OrdersScreenOptions}from '../screens/shop/OrdersScreen';
import CartScreen,{screenOptions as CartScreenOptions} from '../screens/shop/CartScreen';
import UserProductsScreen,{screenOptions as UserProductsScreenOptions} from '../screens/user/UserProductsScreen';
import EditProductScreen,{screenOptions as EditProductScreenOptions} from '../screens/user/EditProductScreen';
import AuthScreen,{screenOptions as AuthScreenOptions} from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors  from '../constants/Colors';
import {Platform,SafeAreaView,Button,View} from 'react-native';

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

const  ProductsStackNavigator=createStackNavigator();

export const ProductsNavigator=()=>{
    return (
        //definiamo la proprietà screenOptions e gli passiamo la default navigation options
        <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
            <ProductsStackNavigator.Screen 
            name="ProductsOverview" 
            component={ProductsOverviewScreen}
            options={ProductsOverviewScreenOptions}//richiamo l'elemento definito nell'import
            />
            <ProductsStackNavigator.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen}
            options={ProductDetailScreenOptions}//richiamo l'elemento definito nell'import
            />
            <ProductsStackNavigator.Screen 
            name="Cart" 
            component={CartScreen}
            options={CartScreenOptions}//richiamo l'elemento definito nell'import
            />
        </ProductsStackNavigator.Navigator>
    );
}

/*
    PRIMA ERA COSI':
    
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
    */




    const OrdersStackNavigator=createStackNavigator();

    export const OrdersNavigator=()=>{
        return (
            //definiamo la proprietà screenOptions e gli passiamo la default navigation options
            <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
                <OrdersStackNavigator.Screen 
                name="Orders" 
                component={OrdersScreen}
                options={OrdersScreenOptions}//richiamo l'elemento definito nell'import
                />
            </OrdersStackNavigator.Navigator>
        );
    }
    /*
//creo un nuovo stackNavigator PRIMA ERA COSì
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
*/


const AdminStackNavigator=createStackNavigator();

export const AdminNavigator=()=>{
    return (
        //definiamo la proprietà screenOptions e gli passiamo la default navigation options
        <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
            <AdminStackNavigator.Screen 
            name="UserProducts" 
            component={UserProductsScreen}
            options={UserProductsScreenOptions}//richiamo l'elemento definito nell'import
            />
            <AdminStackNavigator.Screen 
            name="EditProduct" 
            component={EditProductScreen}
            options={EditProductScreenOptions}//richiamo l'elemento definito nell'import
            />
        </AdminStackNavigator.Navigator>
    );
}
/*
//creo un nuovo stackNavigator QUESTO ERA IL VECCHIO MODO
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
);*/



const ShopDrawerNavigator=createDrawerNavigator();

export const ShopNavigator=()=>{
     const dispatch = useDispatch();
    return(
        <ShopDrawerNavigator.Navigator 
        drawerContent={props => {
           // const dispatch = useDispatch(); non possiamo usarlo qua ma dobbiamo definirlo all'esterno
            return (
              <View style={{ flex: 1, paddingTop: 20 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                  <DrawerItemList {...props} />
                  <Button
                    title="Logout"
                    color={Colors.primary}
                    onPress={() => {
                      dispatch(authActions.logout());
                      //props.navigation.navigate('Auth');
                    }}
                  />
                </SafeAreaView>
              </View>
            );
          }} 
        drawerContentOptions={{
            activeTintColor:Colors.secondo
        }}
        >
            <ShopDrawerNavigator.Screen 
            name="Products" 
            component={ProductsNavigator}
            options={
                {
                    drawerIcon: props => (
                      <Ionicons
                        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        size={23}
                        color={props.color}
                      />
                    )
                  }
            }
            />
            <ShopDrawerNavigator.Screen 
            name="Orders" 
            component={OrdersNavigator} 
            options={
                {
                    drawerIcon: props => (
                      <Ionicons
                        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                        size={23}
                        color={props.color}
                      />
                    )
                  }
            }
            />
            <ShopDrawerNavigator.Screen 
            name="Admin" 
            component={AdminNavigator} 
            options={
                {
                    drawerIcon: props => (
                      <Ionicons
                        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        size={23}
                        color={props.color}
                      />
                    )
                  }
            }
            />
        </ShopDrawerNavigator.Navigator>
    )
};
/**
 * PRIMA ERA COSI'
 * dentro a questo shopNavigator che sarà un menù unirò i due stackNavigator qua sopra,
 * si utilizza contentOptions per il DrawerNavigator per gli stili
 */
/*
const ShopNavigator = createDrawerNavigator(
    {
      Products: ProductsNavigator,
      Orders: OrdersNavigator,
      Admin: AdminNavigator
    },
    {
      contentOptions: {
        activeTintColor:Colors.secondo
    },*/
    /**
     * definisco una contentComponent che prende una funzione
     * <DrawerItems {...props}/> devo sempre impostarlo così
     * 
     */
    /*
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }
    }
  );*/


  const AuthStackNavigator=createDrawerNavigator();

   export const AuthNavigator=()=>{
    return (
        //definiamo la proprietà screenOptions e gli passiamo la default navigation options
        <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthScreenOptions}
      />
    </AuthStackNavigator.Navigator>
    );
  }
/*
const AuthNavigator=createStackNavigator({
    Auth:AuthScreen
},
{
defaultNavigationOptions:defaultNavigationOptions,
}
)*/


/*const MainNavigator=createSwitchNavigator(
    {
        Startup: StartupScreen,
        Auth: AuthNavigator,
        Shop:ShopNavigator
    }
)
export default createAppContainer(MainNavigator);*/