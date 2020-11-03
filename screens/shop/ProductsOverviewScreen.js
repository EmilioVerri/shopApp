import React from 'react';
import {FlatList,Text,View,StyleSheet} from 'react-native';
//facciamo import dello useSelector
import{useSelector} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';



const ProductsOverviewScreen=props=>{
    /**PRODUCTSOVERVIEWSCREEN:
     * creo constante products che chiama lo useSelector che riceve autometicamente lo stato,
     * e che restituisce i dati che vuoi ottenere.
     * state=è lo stato, products=è il nome attribuito al reducer definito nell'App.js dentro alla combineReducer
     * availableproducts è definito all'interno dei reducer nell'initial state
     */
    const products=useSelector(state=>state.products.availableProducts);


    return(
        /**FLATLIST:
         * definisco data= alla variabile products
         * keyExtractor all'id che viene preso dal dummy_data
         * renderItem=gli passiamo un componente di testo con all'interno il titolo preso dalla dummy_data,
         * immagine, prezzo e onViewDetail e onAddToCart  li passo alla ProductItem
         * nella onViewDetail con navigation entro dentro ShopNavigation e con il navigate  navigo verso il valore productDetail definito in ShopNavigation
         * nel momento in cui la onViewDetail naviga verso ProductDetailScreen aggiungengo l'argomento che ha affianco gli passiamo l'id
         * e gli passiamo anche il titolo che andrà nell'intestazione della pagina
         */
    <FlatList 
    data={products}
    keyExtractor={item=>item.id}
    renderItem={itemData=><ProductItem 
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={()=>props.navigation.navigate('ProductDetail',
        {productId:itemData.item.id,
        productTitle:itemData.item.title})}

        onAddToCart={()=>{}}/>
    }/>
    );
}


ProductsOverviewScreen.navigationOptions={
    headerTitle:'All Products'
}

const styles=StyleSheet.create({

});

export default ProductsOverviewScreen;