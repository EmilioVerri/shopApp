import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import Colors from '../../constants/Colors';
import {Platform} from 'react-native';



const ProductItem = props => {
    /**
     * per le cifre decimali utilizzo nel prezzo utilizzo toFixed,
     * sto definendo lo stile e i valori che avranno i campi di testo definiti
     * mettiamo una touchableOpacity che richiama la onViewDetail che è la stessa props definita dentro al Button sotto
     */
    let CambioSistema=TouchableOpacity;
    if(Platform.OS==='android'&& Platform.Version>=21){
        CambioSistema=TouchableNativeFeedback;
    }
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
            <CambioSistema onPress={props.onViewDetail}>
                <View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    <Button color={Colors.secondo} title='View Details' onPress={props.onViewDetail} />
                    <Button color={Colors.ottavo} title='Add To Cart' onPress={props.onAddToCart} />
                </View>
                </View>
        </CambioSistema>
        </View>
            </View>
    );
};


const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,//per fare funzionare gli shadow su android utilizzo elevation
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        overflow:'hidden'//non sovrappone

    },
    image: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontFamily:'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontFamily:'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
       
    },
    touchable:{
        overflow: 'hidden',//non fa sovrapporre l'immagine con il container
        borderRadius:10
    }

});

export default ProductItem;