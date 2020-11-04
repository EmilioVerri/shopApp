//createAppContainer ci permette di reindirizzarci subito all'app di riferimento, sarà il primo component che verrà mostrato
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors  from '../constants/Colors';
import {Platform} from 'react-native';

import CartScreen from '../screens/shop/CartScreen';


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
        defaultNavigationOptions:defaultNavigationOptions,
    }


);

export default createAppContainer(ProductsNavigator);