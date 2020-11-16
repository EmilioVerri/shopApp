import React from 'react';
import {FlatList,Text,Button,View,StyleSheet,Platform,Alert} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

//importo gli HeaderButton
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

//importiamo la ProductItem

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';

import * as productsActions from '../../store/actions/products';


const UserProductsScreen=props=>{


    const dispatch=useDispatch();
    /**creo una funzione per non duplicae il mio codice inutilmente che punta EditProductsScreen
     * e gli passo sotto il nome di productId id del prodotto selezionato alla  EditProduct
     */
    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', { productId: id });
      };

    /**UserProductsScreen:
     * definisco una nuova constante useproducts dove gli passo useSelector al suo interno c'è:
     * product che viene richiamato dentro App.js e lo userProducts che vado a prenderlo dentro al reducers products
     * 
     */


    const userProducts = useSelector(state => state.products.userProducts);


    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
          { text: 'No', style: 'default' },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => {
              dispatch(productsActions.deleteProduct(id));
            }
          }
        ]);
      };

    /**RETURN:
     * nella return definisco una FLATLIST:
     * dentro a data definisco: userProducts dove avremo accesso ai prodotti dell'utente
     * nel keyExtractor vado a riprendere: l'id dentro a models products
     * nel renderItems vado a definire: una funzione con un campo di input itemData che ci ritorna ProductItem che riprende l'immagine da models product
     * faccio la stessa cosa per il title, price e definisco anche la onSelect
     * dentro la onSelect richiamo la funzione editProductHandler  che naviga verso editProductScreen e gli passa l'id
     * 
     * in seguito trai 2 tag di apertura e chiusura <ProductItem> </ProductItem> inserirò i 2 button edit e delete
     * 
     * 1)NELLA BUTTON EDIT:
     * richiamo la funzione editProductHandler  che naviga verso editProductScreen e gli passa l'id
     * 
     * 2)NELLA BUTTON DELETE:
     * faccio la dispatch dell'azione importata e gli passo alla funzione dentro quell'azione id
     */
    
    return (
        <FlatList
          data={userProducts}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <ProductItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              onSelect={() => {
                editProductHandler(itemData.item.id);
              }}
            >
              <Button
                color={Colors.primary}
                title="Edit"
                onPress={() => {
                  editProductHandler(itemData.item.id);
                }}
              />
              <Button
                color={Colors.primary}
                title="Delete"
                onPress={deleteHandler.bind(this, itemData.item.id)}
              />
            </ProductItem>
          )}
        />
      );
    };
    


    UserProductsScreen.navigationOptions = navData => {
        return {
          headerTitle: 'Your Products',
          headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navData.navigation.toggleDrawer();//scrivendo questo appena clicco il bottone apre il menù
                }}
                />
              </HeaderButtons>
            ),
    
/**in questo caso non gli passiamo niente alla schermata, perchè se voglio creare un nuovo prodotto non gli devo passare niente alla EditProductScreen */
headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Add"
        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        onPress={() => {
          navData.navigation.navigate('EditProduct');//scrivendo questo appena clicco il bottone apre il menù
        }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductsScreen;
