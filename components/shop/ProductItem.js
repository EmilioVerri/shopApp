import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import Colors from '../../constants/Colors';
import {Platform} from 'react-native';
import Card from '../UI/Card';



const ProductItem = props => {


    /**
     * per le cifre decimali utilizzo nel prezzo utilizzo toFixed,
     * sto definendo lo stile e i valori che avranno i campi di testo definiti
     * mettiamo una touchableOpacity che richiama la onSelect che è la stessa props definita dentro al Button sotto
     */
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback;
    }
  
    return (
      <Card style={styles.product}>
        <View style={styles.touchable}>
          <TouchableCmp onPress={props.onSelect} useForeground>
            <View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
              </View>
              <View style={styles.actions}>
                {/*<Button color={Colors.secondo} title='View Details' onPress={props.onViewDetail} />
                    <Button color={Colors.ottavo} title='Add To Cart' onPress={props.onAddToCart} />*/}
                  {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
    product: {
      height: 300,
      margin: 20
    },
    touchable: {
      borderRadius: 10,
      overflow: 'hidden'
    },
    imageContainer: {
      width: '100%',
      height: '60%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    details: {
      alignItems: 'center',
      height: '17%',
      padding: 10
    },
    title: {
      fontFamily: 'open-sans-bold',
      fontSize: 18,
      marginVertical: 2
    },
    price: {
      fontFamily: 'open-sans',
      fontSize: 14,
      color: '#888'
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '23%',
      paddingHorizontal: 20
    }
  });
  
  export default ProductItem;
  