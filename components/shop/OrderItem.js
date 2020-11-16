//definisco useState per gestire il numero di ordini e vedere il dettaglio
import React,{useState} from 'react';
import { Button, Text, View, StyleSheet, Platform } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';


const OrderItem = props => {
/**
 * ORDERITEM:
 * definisco use state e lo pongo uguale a false
 */

const [showDetails, setShowDetails] = useState(false);

/**
 * RETURN:
 * in button quando faccio onPress voglio cambiare lo stato dello useState definito sopra
 * dentro alla onPress passo setShowDetails e gli dico che prevState è not così cambia da false a true
 * 
 * {showDetails && <View></View>} se showDetails è true ritorna la <View></View>
 * dentro alla view inserisco:
 * 
 * un map su cartItems 
 * devo definire anche una chiave per ogni oggetto senò mi darà un errore,
 * la key è definita dentro cartScreen
 * 
 * 
 * title={showDetails ?'Hide Details' :'Show Details'} lo utilizziamo per mostrare p nascondere i dettagli
 */
return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
});

export default OrderItem;
