import React,{useState,useEffect,useCallback} from 'react';//definisco useState per il caricamento iniziale
import {FlatList,Text,View,StyleSheet,Platform,Button,ActivityIndicator} from 'react-native'; //ActivityIndicator serve per indicare uno spinner di attesa
//facciamo import dello useSelector e la useDispatch
import{useSelector,useDispatch} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

//importo tutte le azioni di cart
import * as cartActions from '../../store/actions/cart';

//richiamo azione
import * as productsActions from '../../store/actions/products';

//importo gli HeaderButton
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';



const ProductsOverviewScreen = props => {
//faccio useState per il caricamento della pagina iniziale e lo definisco false
const [isLoading, setIsLoading] = useState(false);
//definisco nuovo state per gli errori e lo inizializzo undefined cioè vuoto
const [error, setError] = useState();


    /**PRODUCTSOVERVIEWSCREEN:
     * creo constante products che chiama lo useSelector che riceve autometicamente lo stato,
     * e che restituisce i dati che vuoi ottenere.
     * state=è lo stato, products=è il nome attribuito al reducer definito nell'App.js dentro alla combineReducer
     * availableproducts è definito all'interno dei reducer nell'initial state
     * 
     * e sotto a questa definisco una constante uguale alla useDispatch
     */
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    /**definiamo una useEffects per ricevere le informazioni dal DB
     * e facciamo la dispatch sull'azione productsActions
     * facendo così ci resituirà un oggetto da fireBase e ogni oggetto è abbinato al suo ID univoco
     * 
     * dentro useEffects metto isLoading a true che è quando carico gli elementi da FireBase
     * creo un asincrono nella mia Effects e devo avvolgerlo in una funzione dentro alla useEffects
     * e dentro a questa funzione metto sia il setIsLoading(true); sia la dispatch
     * e poi richiamo la funzione loadProducts() 
     * utilizzo await per aspettare che la dispatch sia fatta e dopo che l'ha fatta
     * facciamo setIsLoading(falsa)
     */

     

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(productsActions.fetchProducts());
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }, [dispatch, setIsLoading, setError]);
    
      

      /**imposto un ascoltatore di eventi di navigazione:
       * utilizzo la useEffect per impostarlo
       * utilizziamo la addListener come ascoltatore di eventi di navigazione senò si spacca e gli do un nome che esegue quell'elemento
       * all'interno gli passo un secondo elemento che è il richiamo della constante definita prima loadProducts
       * ritorna questa effects(è l'unica volta che una effects ritorna qualcosa), ritorno una funzione
       * archiviamo quello che abbiamo definito sopra dentro ad una constante willFocusSub e la richiamiamo dentro alla return e gli passo anche una remove
       * come direttive gli passo:
       * loadProducts
       * 
      */
     useEffect(() => {
        const willFocusSub = props.navigation.addListener(
          'willFocus',
          loadProducts
        );
    
        return () => {
            willFocusSub.remove();
          };
        }, [loadProducts]);

     /**per gestire gli errori faccio una try e una catch qua dentro */
    useEffect(()=>{

        /** dispatch(productsActions.fetchProducts()); prima estraevo solo il prodotto dal DB adesso gestisco anche il caricamento della pagina */
       /*LA SPOSTO IN UNA FUNZIONE COSì CHE POSSA ESSERE RICHIAMATA PIU' VOLTE e lo mettiamo dentro ad una useCallBack
        const loadProducts=async()=>{
            setIsLoading(true);
            try{
                await dispatch(productsActions.fetchProducts());
            }catch(err){
                setError(err.message);//richiamo useState
            }
            setIsLoading(false);
        }*/
        loadProducts(); //richiamo la funzione sopra
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
          productId: id,
          productTitle: title
        });
      };


    /**
         * gestiamo lo state di error e se è vero allora stampo il testo
         */

        if (error) {
            return (
              <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button
                  title="Try again"
                  onPress={loadProducts}
                  color={Colors.secondo}
                />
              </View>
            );
          }
    /**GESTIAMO CON UN CONTROLLO: 
     * se isLoading è true fa lo spinner fino a quando non ha caricato i prodotti e torna false
    */
   if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.secondo} />
      </View>
    );
  }
/**
 * FACCIO UN ALTRO CONTROLLO:
 * se isLoading è falsa quindi ha caricato gli elementi e ci sono zero elementi allora stampa:
 * 
 */
if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }


        






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
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
        /*onViewDetail={()=>props.navigation.navigate('ProductDetail',
        {productId:itemData.item.id,
        productTitle:itemData.item.title})}*/
/*
        onAddToCart={()=>{
            dispatch(cartActions.addToCart(itemData.item))
        }}*/ >


<Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
      headerTitle: 'All Products',
      headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              navData.navigation.navigate('Cart');
            }}
          />
        </HeaderButtons>
      )
    };
  };
  
  const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
  });
  
  export default ProductsOverviewScreen;
  