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
     */
    return(
        <ScrollView>
            <Image source={{uri: selectedProduct.imageUrl}}/>
            <Button title='Add to Cart' onPress={()=>{}}/>
            <Text></Text>
            <Text></Text>
        </ScrollView>
    );
}

ProductDetailScreen.navigationOptions=navData=>{
    return{
        headerTitle:navData.navigation.getParam('productTitle')
    }
}


const styles=StyleSheet.create({

});

export default ProductDetailScreen;