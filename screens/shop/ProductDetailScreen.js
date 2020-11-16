import React from 'react';
import {ScrollView,Image,Button,Text,View,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

//importo tutte le azioni di cart
import * as cartActions from '../../store/actions/cart';


const ProductDetailScreen=props=>{
    /**NELLA PRODUCTDETAILSCREEN:
     * estraiamo l'id della productsOverviewScreen attraverso la getParam su productId
     * 
     * nella selectedProduct facciamo uno use selector che richiama lo state.products definito nell'app.js .availableProducts che si trova dentro al reducers
     * facciamo una find così da poter prendere il singolo elemento con quell'id, e gli diciamo di prendere solo l'id del prodotto che viene passato
     */
    const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();

    /**
     * RETURN DI PRODUCTDETAILSCREEN:
     * richiamo constante selectedproduct.title= per riprendere il titolo dell'oggetto descritto
     * faccio la stessa cosa per l'immagine, per il prezzo(metto la toFixed che serve per i decimali)
     * 
     * nel button add to cart facciamo dispatch dell'azione vado dentro azione cartActions definito nella import sopra 
     * e prendo l'azione addToCart e gli passo selectedProduct che è tutto il prodotto selezionato, che è quello che richiede l'azione
     */
    return (
        <ScrollView>
          <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
          <View style={styles.actions}>
            <Button
              color={Colors.primary}
              title="Add to Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
              }}
            />
          </View>
          <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
      );
    };
    

    ProductDetailScreen.navigationOptions = navData => {
        return {
          headerTitle: navData.navigation.getParam('productTitle')
        };
      };

      const styles = StyleSheet.create({
        image: {
          width: '100%',
          height: 300
        },
        actions: {
          marginVertical: 10,
          alignItems: 'center'
        },
        price: {
          fontSize: 20,
          color: '#888',
          textAlign: 'center',
          marginVertical: 20,
          fontFamily: 'open-sans-bold'
        },
        description: {
          fontFamily: 'open-sans',
          fontSize: 14,
          textAlign: 'center',
          marginHorizontal: 20
        }
      });
      
      export default ProductDetailScreen;
      