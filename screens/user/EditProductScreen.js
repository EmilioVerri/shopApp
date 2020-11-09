import React,{useState,useEffect,useCallback} from 'react';//usiamo useState per salvare l'input dell'utente
import { ScrollView, Text, View, StyleSheet, Platform, TextInput } from 'react-native';
//importo gli HeaderButton
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

//importo lo useSelector
import {useSelector} from 'react-redux';

const EditProductScreen = props => {
/** EditProductScreen:
 * definisco useState per salvare i dati dell'utente
 * e creo tanti useState quanti i campi di input che ho fatto dentro alla return
 * se editProduct è presente (perchè viene passato id a questo componente che permette a editedproduct di esistere) siamo nella sezione modifica e quindi possiamo modificare il titolo, l'immagine, e la descrizione
 * il prezzo rimane invariato. Se invece la editedProduct non c'è allora siamo in aggiungi e fallo rimanere vuoto
 * 
 * definisco il richiamo dallo UserProductsScreen del productId dentro alla constante prodId
 * 
 * richiamo dal reducers passando per l'app.js con products che fa riferimento al reducers productsReducer che va a prendere le informazioni dentro userproducts
 * e fa una find che va a verificare che id che viene passato sia uguale a quello del prodotto
 * 
 * 
 * definisco la submitHandler che farà la submit dei prodotti inseriti dall'utente, per farlo userò una useEffects e una useCallBack(che deve stare attorno alla fuznione)
 * faccio una useEffects, come dipendenza avrà la submitHandler
 * all'interno della useEffects ci sarà:
 * una setParams in cui submit sarà la chiave della submitHandler,
 * quindi adesso possiamo richiamarlo dentro alla navigationOptions
 * 
*/


const prodId=props.navigation.getParam('productId');

const editedProduct=useSelector(state=>state.products.userProducts.find(prod=>prod.id===prodId));



const[title,setTitle]=useState(editedProduct?editedProduct.title:'');
const[imageUrl,setImageUrl]=useState(editedProduct?editedProduct.imageUrl:'');
const[price,setPrice]=useState('');
const[description,setDescription]=useState(editedProduct?editedProduct.description:'');


const submitHandler=useCallback(()=>{
    console.log('Submitting!');
},[]);


useEffect(()=>{
props.navigation.setParams({submit:submitHandler})
},
[submitHandler])



/**RETURN:
 * nella return creiamo dei campi di testo di input e dentro ad essi l'utente inserirà le informazioni
 * per ogni campo di input gli diamo un value che è uguale a quello definito dentro agli useState
 * e nelle corrispettive onChangeText definiamo tutte le set
 * 
 * allora dove c'è price abbiamo definito:
 * che se editedProduct esiste (perchè viene passato id a questo componente che permette a editedproduct di esistere)
 * allora siamo nella sezione modifica e quindi non mostrare questo il campo price, perchè il prezzo sarà invariato. 
 * Se editedProduct invece non esiste mostra questo campo così che l'utente può modificarlo
 */
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text=>setTitle(text)}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text=>setImageUrl(text)}/>
                </View>
               {editedProduct?null: <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={text=>setPrice(text)}/>
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text=>setDescription(text)}/>
                </View>
            </View>
        </ScrollView>
    );
}


EditProductScreen.navigationOptions=navData=>{

    /**definisco una constante che ha una getParam che riprende la submit come chiave presa dalla useEffects */
    const submitFn=navData.navigation.getParam('submit');
    /**definiamo una navigationOptions e per rendere il titolo dinamico definiamo una getParam 
     * se dalla schermata UserproductsScreen clicchiamo e passiamo productId alla EditProduct allora il titolo sarà EditProduct senò 
     * se non viene passato nulla il titolo sarà Add Product
     * 
     * dentro la onPress richiamo la funzione submitFn definita qua sopra
    */
    return{
        headerTitle:navData.navigation.getParam('productId')?'Edit Product':'Add Product',
        headerRight:(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Save' iconName={Platform.OS==='android'?'md-checkmark':'ios-checkmark'} 
            onPress={submitFn}/>
        </HeaderButtons>
        )
    }
}


const styles = StyleSheet.create({
    form:{
        margin:20,
    },
    formControl:{
        width:'100%'
    },
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:8
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    }
})


export default EditProductScreen;