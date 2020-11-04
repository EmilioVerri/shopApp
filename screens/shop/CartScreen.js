import React from 'react';
import { FlatList, Text, View, StyleSheet, Button } from 'react-native';

import Colors from '../../constants/Colors';
//importo useSelector
import {useSelector} from 'react-redux';

const CartScreen = props => {
    /**CART SCREEN:
     * definisco una nuova constante che va a riprendere con lo useSelector cart nell'app.js che fa riferimento al reducers cart,
     * e dentro al reducers cart prende la TotalAmount
     * 
     * per gli items siccome è un array:
     * 1) definisco una nuova constante con un nuovo array
     * 2) faccio ciclo for che scorre tutte le chiavi dell'array items
     * 3) dentro al ciclo for farò una push dell'array creato prima e spingo tutti gli items dentro ad un oggetto javascript
     * che ha un id del prodotto che è la key quindi dentro questo oggetto ci sarà la key come valore e ci sarà anche il titolo del prodotto
     * 
     */
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
     return  transformedCarItems;
     });

/**NELLA RETURN DEFINISCO:
 * richiamo la cartTotalAmount che al suo interno ha il prezzo totale
 * 
 * nella button metto la disable, se la lunghezza degli articoli del carrello è uguale a zero allora disabilito il pulsante, se invece
 * ci sono degli oggetti restituira true e sarà abilitato il pulsante
 */
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total:<Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                    </Text>
                    
                <Button title='Order Now' disabled={cartItems.length===0} />
            </View>
            <View>
                <Text>CARD ITEMS</Text>
            </View>
        </View>
    );
}

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