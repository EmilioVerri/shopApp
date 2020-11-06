import React from 'react';
import {FlatList,Text,View,StyleSheet,Platform,Button} from 'react-native';
//facciamo import dello useSelector e la useDispatch
import{useSelector,useDispatch} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

//importo tutte le azioni di cart
import * as cartActions from '../../store/actions/cart';

//importo gli HeaderButton
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';



const ProductsOverviewScreen=props=>{
    /**PRODUCTSOVERVIEWSCREEN:
     * creo constante products che chiama lo useSelector che riceve autometicamente lo stato,
     * e che restituisce i dati che vuoi ottenere.
     * state=è lo stato, products=è il nome attribuito al reducer definito nell'App.js dentro alla combineReducer
     * availableproducts è definito all'interno dei reducer nell'initial state
     * 
     * e sotto a questa definisco una constante uguale alla useDispatch
     */
    const products=useSelector(state=>state.products.availableProducts);

    const dispatch=useDispatch();

    const selectItemHandler=(id,title)=>{
        props.navigation.navigate('ProductDetail',
        {productId:id,
        productTitle:title
    })

    };



    return(
        /**FLATLIST:
         * definisco data= alla variabile products
         * keyExtractor all'id che viene preso dal dummy_data
         * renderItem=gli passiamo un componente di testo con all'interno il titolo preso dalla dummy_data,
         * immagine, prezzo e onViewDetail e onAddToCart  li passo alla ProductItem
         * 
         * nella onViewDetail con navigation entro dentro ShopNavigation e con il navigate  navigo verso il valore productDetail definito in ShopNavigation
         * nel momento in cui la onViewDetail naviga verso ProductDetailScreen aggiungengo l'argomento che ha affianco gli passiamo l'id
         * e gli passiamo anche il titolo che andrà nell'intestazione della pagina, LA GESTIONE DELLA ONVIEWDETAIL E' GESTITA ADESSO DALLA CONSTANTE SOPRE SELECTITEMHANDLER
         * adesso non ci sarà più la onViewDetail ma gestisco la onSelect, dove richiamo constante selectItemHandler e gli passo id, title e gestisco la funzione
         * dentro al button ViewDetails richiamo la funzione selectItemHandler
         * 
         * 
         * nella onAddToCart facciamo dispatch dell'azione vado dentro azione cartActions definito nella import sopra
         * e prendo l'azione addToCart e gli passo itemdata.item che è tutto il prodotto, che è quello che richiede l'azione,
         * NON CI SARA PIU LA onAddToCart , la dispatch la inserirò direttamente dentro al button add to cart
         * 
         * inserisco i 2 button che erano dentro alla Productitem e gestisco già qua la logica
         */
    <FlatList 
    data={products}
    keyExtractor={item=>item.id}
    renderItem={itemData=><ProductItem 
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={()=>{
            selectItemHandler(itemData.item.id, itemData.item.title)
        }}
        /*onViewDetail={()=>props.navigation.navigate('ProductDetail',
        {productId:itemData.item.id,
        productTitle:itemData.item.title})}*/
/*
        onAddToCart={()=>{
            dispatch(cartActions.addToCart(itemData.item))
        }}*/ >


            <Button color={Colors.secondo} title='View Details' onPress={()=>{
            selectItemHandler(itemData.item.id, itemData.item.title)
        }} />
            <Button color={Colors.ottavo} title='Add To Cart' onPress={()=>{
                dispatch(cartActions.addToCart(itemData.item))
            }} />
        </ProductItem>
    }/>
    );
}


ProductsOverviewScreen.navigationOptions=navData=>{
    return{
    headerTitle:'All Products',
    headerLeft:(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu' iconName={Platform.OS==='android'?'md-menu':'ios-menu'} 
        onPress={()=>{navData.navigation.toggleDrawer();//scrivendo questo appena clicco il bottone apre il menù
        }}/>
    </HeaderButtons>
    ),
    
    headerRight:(
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Cart' iconName={Platform.OS==='android'?'md-cart':'ios-cart'} onPress={()=>navData.navigation.navigate('Cart')}/>
    </HeaderButtons>
    )}
}

const styles=StyleSheet.create({

});

export default ProductsOverviewScreen;