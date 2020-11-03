import React from 'react';
import {ScrollView,Image,Button,Text,View,StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const ProductDetailScreen=props=>{
    /**NELLA PRODUCTDETAILSCREEN:
     * estraiamo l'id della productsOverviewScreen attraverso la getParam su productId
     * 
     * nella selectedProduct facciamo uno use selector che richiama lo state.products definito nell'app.js .availableProducts che si trova dentro al reducers
     * facciamo una find così da poter prendere il singolo elemento con quell'id, e gli diciamo di prendere solo l'id del prodotto che viene passato
     */
    const productId=props.navigation.getParam('productId');
    const selectedProduct=useSelector(state=>state.products.availableProducts.find(prod=>prod.id===productId));

    /**
     * RETURN DI PRODUCTDETAILSCREEN:
     * richiamo constante selectedproduct.title= per riprendere il titolo dell'oggetto descritto
     * faccio la stessa cosa per l'immagine, per il prezzo(metto la toFixed che serve per i decimali)
     */
    return(
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
            <Button title='Add to Cart' onPress={()=>{}}/>
            </View>
            <Text  style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text  style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

ProductDetailScreen.navigationOptions=navData=>{
    return{
        headerTitle:navData.navigation.getParam('productTitle')
    }
}


const styles=StyleSheet.create({
    image:{
        width:'100%',
        height:300,
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20,
        fontFamily:'open-sans-bold',
    },
    description:{
        fontFamily:'open-sans',
        fontSize:14,
        textAlign:'center'
    },
    actions:{
        marginVertical:12,
        alignItems:'center',
        marginHorizontal:20
        
    }
});

export default ProductDetailScreen;