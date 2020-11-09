import React from 'react';
import { FlatList, Text, View, StyleSheet, Button } from 'react-native';

import Colors from '../../constants/Colors';
//importo useSelector
import {useSelector,useDispatch} from 'react-redux';
//importo il componente CartItem
import CartItem from '../../components/shop/CartItem';

//importo azioni che ho bisogno
import* as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/order';

const CartScreen = props => {
    /**CART SCREEN:
     * definisco una constante dispatch che serve per inviare azione e la metto uguale a useDispatch()
     * 
     * definisco una nuova constante che va a riprendere con lo useSelector cart nell'app.js che fa riferimento al reducers cart,
     * e dentro al reducers cart prende la TotalAmount
     * 
     * per gli items siccome è un array:
     * 1) definisco una nuova constante con un nuovo array
     * 2) faccio ciclo for che scorre tutte le chiavi dell'array items
     * 3) dentro al ciclo for farò una push dell'array creato prima e spingo tutti gli items dentro ad un oggetto javascript
     * che ha un id del prodotto che è la key quindi dentro questo oggetto ci sarà la key come chiave e ci sranno come valori di questa chiave:
     * il titolo , il prezzo , la quantità, la somma dei valori che sono attribuiti alla stessa chiave
     * ritorniamo l'array che adesso sarà popolato di oggetti, definisco .sort() per ordinare gli oggetti
     * questa funzione dentro sort è la normale funzione js vale su tutto IMPORTANTE impratica:
     * andrà ad ordinare i prodotti a seconda del loro ordine di elenco della productId nella pagina dove c'è addToCarrell
     * 
     * 
     */

     const dispatch=useDispatch();


     const cartTotalAmount= useSelector(state=>state.cart.totalAmount);//faccio così perchè è un oggetto
     const cartItems=useSelector(state=>{//faccio così perchè è un array
        const transformedCarItems=[];
        for(const key in state.cart.items){
            transformedCarItems.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key]. productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum

            })
        }
     return  transformedCarItems.sort((a,b)=>a.productId>b.productId?1:-1);
     });

/**NELLA RETURN DEFINISCO:
 * richiamo la cartTotalAmount che al suo interno ha il prezzo totale
 * 
 * nella button metto la disable, se la lunghezza degli articoli del carrello è uguale a zero allora disabilito il pulsante, se invece
 * ci sono degli oggetti restituira true e sarà abilitato il pulsante
 * definisco una onPress e passo alla funzione dentro il component action degli ordini
 * passo alla funzione addOrder(cartItems,cartTotalAmount)
 * 
 * Dove ho scritto Math.round(...*100)/100 serve per evitare che durante i calcoli js si perda e vada a mettermi un errore con il segno meno
 */
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:<Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text>
                    </Text>
                    
                <Button 
                title='Order Now' 
                disabled={cartItems.length===0} 
                onPress={()=>{
                    dispatch(ordersActions.addOrder(cartItems,cartTotalAmount))
                }}/>
            </View>
            {/**FLATLIST:
             * passiamo come data la constante definita sopra cartItems
             * passiamo come estrattore di chiavi la chiave univa definita productId come id dell'oggetto definito sopra
             * e come ritorno ci darà la quantità, il titolo, l'ammontare e ci sarà la remove 
             * la remove faccio la dispatch per inviare un azione entro dentro il component che ho definito cartActions e alla funzione 
             * removeFromCart gli passo la productId che ho definito sopra
             * 
             */}
             

            < FlatList 
            data={cartItems}
            keyExtractor={item=>item.productId} 
            renderItem={itemData=>
            <CartItem 
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable //se lo metto così è impostato a true
            onRemove={()=>{
                dispatch(cartActions.removeFromCart(itemData.item.productId));
            }} />}
            />
        </View>
    );
}


CartScreen.navigationOptions={
    headerTitle:'Your Cart'
};

const styles = StyleSheet.create({
    screen:{
        margin:20, 
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,//per fare funzionare gli shadow su android utilizzo elevation
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18,
    },
    amount:{
        color:Colors.sesto
    }


});

export default CartScreen;