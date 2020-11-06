import React from 'react';
import {FlatList,Text,View,StyleSheet,Platform} from 'react-native';
import {useSelector} from 'react-redux';

//importo gli HeaderButton
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

//importiamo la ProductItem

import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen=props=>{

    /**UserProductsScreen:
     * definisco una nuova constante useproducts dove gli passo useSelector al suo interno c'è:
     * product che viene richiamato dentro App.js e lo userProducts che vado a prenderlo dentro al reducers products
     * 
     */


    const userProducts=useSelector(state=>state.products.userProducts)


    /**RETURN:
     * nella return definisco una FLATLIST:
     * dentro a data definisco: userProducts dove avremo accesso ai prodotti dell'utente
     * nel keyExtractor vado a riprendere: l'id dentro a models products
     * nel renderItems vado a definire: una funzione con un campo di input itemData che ci ritorna ProductItem che riprende l'immagine da models product
     * faccio la stessa cosa per il title, price e definisco anche la onViewDetail e onAddToCart
     */
    return(
        <FlatList 
        data={userProducts}
        keyExtractor={item=>item.id}
        renderItem={itemData=>
        <ProductItem 
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={()=>{}}
        onAddToCart={()=>{}}
        />}
        />
    );
}


UserProductsScreen.navigationOptions=navData=>{
    return {
    headerTitle:'Your Products',
    headerLeft:(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu' iconName={Platform.OS==='android'?'md-menu':'ios-menu'} 
        onPress={()=>{navData.navigation.toggleDrawer();//scrivendo questo appena clicco il bottone apre il menù
        }}/>
    </HeaderButtons>
    ),
}}


const styles=StyleSheet.create({

})


export default UserProductsScreen;