import React,{useState} from 'react';
import { FlatList, Text, View, StyleSheet, Button,ActivityIndicator} from 'react-native';

import Colors from '../../constants/Colors';
//importo useSelector
import {useSelector,useDispatch} from 'react-redux';
//importo il componente CartItem
import CartItem from '../../components/shop/CartItem';

//importo azioni che ho bisogno
import* as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/order';
import Card from '../../components/UI/Card';

const CartScreen = props => {

    const [isLoading,setIsLoading]=useState(false);
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


     const cartTotalAmount = useSelector(state => state.cart.totalAmount);//faccio così perchè è un oggetto
     const cartItems = useSelector(state => {//faccio così perchè è un array
        const transformedCartItems = [];
        for (const key in state.cart.items) {
          transformedCartItems.push({
            productId: key,
            productTitle: state.cart.items[key].productTitle,
            productPrice: state.cart.items[key].productPrice,
            quantity: state.cart.items[key].quantity,
            sum: state.cart.items[key].sum,
            productPushToken: state.cart.items[key].pushToken
          });
        }
        return transformedCartItems.sort((a, b) =>
          a.productId > b.productId ? 1 : -1
        );
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
 * 
 * sposto il valore che prima avevo dentro la onPress nella constante sendOrderHandler
 */


 const sendOrderHandler=async() => {
     setIsLoading(true);
     await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
     setIsLoading(false);
  }


return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? <ActivityIndicator size='large' color={Colors.secondo}/>: 
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={sendOrderHandler
        /*() => {
                dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
              }*/}
            
        />
    }
      </Card>
            {/**FLATLIST:
             * passiamo come data la constante definita sopra cartItems
             * passiamo come estrattore di chiavi la chiave univa definita productId come id dell'oggetto definito sopra
             * e come ritorno ci darà la quantità, il titolo, l'ammontare e ci sarà la remove 
             * la remove faccio la dispatch per inviare un azione entro dentro il component che ho definito cartActions e alla funzione 
             * removeFromCart gli passo la productId che ho definito sopra
             * 
             */}
             

             <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};


//CartScreen.navigationOptions = {non sarà più così ma sarà una constante da esportare
export const screenOptions={
    headerTitle: 'Your Cart'
  };
  
  const styles = StyleSheet.create({
    screen: {
      margin: 20
    },
    summary: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      padding: 10
    },
    summaryText: {
      fontFamily: 'open-sans-bold',
      fontSize: 18
    },
    amount: {
      color: Colors.primary
    },
    centered:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    }
  });
  
  export default CartScreen;
  